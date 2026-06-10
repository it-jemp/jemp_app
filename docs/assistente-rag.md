# Assistente JEMP — Documentazione

Questo documento descrive l'architettura tecnica del chatbot RAG integrato nella web app JEMP, il flusso di funzionamento e le istruzioni d'uso per utenti e amministratori.

---

## Cos'è l'Assistente JEMP

L'Assistente JEMP è un chatbot AI che risponde a domande sui documenti interni dell'associazione (strategie, KPI, verbali, procedure). Non è un modello generico: risponde **solo** usando i contenuti effettivamente presenti nella cartella Google Drive configurata, citando sempre la fonte.

---

## Architettura

### Stack tecnologico

| Componente | Tecnologia |
|---|---|
| Frontend | Nuxt 3 + Nuxt UI |
| Backend | Nitro (server Nuxt 3) |
| Modello embedding | `qwen/qwen3-embedding-8b` via OpenRouter |
| Modello chat | `google/gemini-2.0-flash-001` via OpenRouter |
| Vector store | Supabase PostgreSQL + estensione `pgvector` |
| Sorgente documenti | Google Drive (service account) |

### Schema RAG (Retrieval-Augmented Generation)

Il sistema si basa sul pattern **RAG**: prima di rispondere, recupera i frammenti di testo più rilevanti dal database vettoriale e li passa come contesto al modello di linguaggio. Il modello non "sa" nulla al di fuori di ciò che trova nei documenti.

```
Domanda utente
      │
      ▼
┌─────────────────────┐
│  Embedding domanda  │  ← OpenRouter (qwen3-embedding-8b)
└─────────────────────┘
      │  vettore 4096 dimensioni
      ▼
┌─────────────────────────────────────────┐
│  Ricerca similarità coseno in pgvector  │
│  threshold 0.65 · top-6 risultati       │
└─────────────────────────────────────────┘
      │  chunk di testo rilevanti + titoli
      ▼
┌──────────────────────────────────────────┐
│  Costruzione prompt con contesto + storia │
│  conversazione (ultimi 10 messaggi)       │
└──────────────────────────────────────────┘
      │
      ▼
┌──────────────────────────────┐
│  Generazione risposta        │  ← OpenRouter (gemini-2.0-flash)
└──────────────────────────────┘
      │
      ▼
Risposta + lista fonti citate
```

### Schema del database (Supabase)

```sql
-- Documenti vettorializzati
rag_documents (
  id          uuid PRIMARY KEY,
  content     text,              -- testo del chunk
  embedding   vector(4096),      -- vettore semantico
  title       text,              -- nome del file Drive
  source      text,              -- sempre 'google_drive'
  source_id   text UNIQUE,       -- '{file_id}_chunk_{n}' per upsert idempotente
  metadata    jsonb              -- { file_id, mime_type }
)

-- Log delle sincronizzazioni
rag_ingestion_logs (
  id              uuid PRIMARY KEY,
  started_at      timestamptz,
  completed_at    timestamptz,
  files_processed int,
  chunks_inserted int,
  errors          jsonb,
  status          text   -- 'running' | 'completed' | 'failed'
)
```

### Flusso di ingestion (sincronizzazione documenti)

```
Google Drive (cartella configurata)
      │
      ▼
┌───────────────────────────────────┐
│  Listing ricorsivo sottocartelle  │  ← googleapis (service account)
└───────────────────────────────────┘
      │  lista file (id, nome, mimeType)
      ▼
┌────────────────────────────────────────────────────┐
│  Per ogni file:                                     │
│   • Google Doc  → export text/plain                 │
│   • Spreadsheet → export text/csv                   │
│   • File .txt   → download diretto                  │
│   • PDF / altro → saltato (loggato come non support.)│
└────────────────────────────────────────────────────┘
      │  testo grezzo
      ▼
┌────────────────────────────────────┐
│  Chunking: finestre da 500 parole  │
│  con overlap di 50 parole          │
└────────────────────────────────────┘
      │  n chunk per file
      ▼
┌──────────────────────────────────┐
│  Embedding di ogni chunk         │  ← OpenRouter (qwen3-embedding-8b)
└──────────────────────────────────┘
      │  vettori 4096-dim
      ▼
┌──────────────────────────────────────────────────┐
│  UPSERT in rag_documents                          │
│  (conflict su source_id → aggiornamento chunk)    │
└──────────────────────────────────────────────────┘
```

### Mappa dei file

```
types/
  rag.ts                           # Interfacce TypeScript condivise

server/utils/
  supabase-admin.ts                # Client Supabase con service role key
  openrouter.ts                    # embedText() + generateResponse()
  google-drive.ts                  # getDriveClient(), listFilesInFolder(), fetchFileText()
  chunker.ts                       # chunkText() — splitting con overlap
  auth.ts                          # requireAuth() / requireAdmin() per H3

server/api/assistant/
  chat.post.ts                     # POST /api/assistant/chat
  ingest.post.ts                   # POST /api/assistant/ingest  (solo admin)
  stats.get.ts                     # GET  /api/assistant/stats   (solo admin)

middleware/
  auth.ts                          # Redirect a /login se non autenticati

pages/
  assistant.vue                    # Interfaccia chat per i membri
  admin/index.vue                  # Dashboard admin (sync + statistiche)
```

---

## Guida utente — Interfaccia chat

### Accesso

La pagina è disponibile all'indirizzo `/assistant`. È protetta: solo i membri autenticati con un account Supabase possono accedervi. Chi non è loggato viene reindirizzato automaticamente a `/login`.

### Come usare il chatbot

1. **Apri la pagina** `/assistant` dall'app JEMP.
2. **Leggi il messaggio di benvenuto** — spiega brevemente cosa può fare l'assistente.
3. **Usa i suggerimenti** — sotto il primo messaggio compaiono tre domande di esempio cliccabili per iniziare subito:
   - "Qual è la strategia del board?"
   - "A che punto sono i KPI commerciali?"
   - "Come funziona la procedura di iscrizione?"
4. **Scrivi la tua domanda** nel campo in basso e premi **Invio** oppure il pulsante **Invia**.
5. **Attendi la risposta** — un indicatore mostra che l'assistente sta cercando nei documenti.
6. **Leggi la risposta** con i badge delle fonti consultate sotto il testo.

### Cosa può e non può fare

| Può fare | Non può fare |
|---|---|
| Rispondere su documenti presenti nella cartella Drive configurata | Rispondere a domande su argomenti non presenti nei documenti |
| Citare la fonte del documento usato | Inventare informazioni o "allucinare" (è vincolato al contesto) |
| Mantenere il contesto degli ultimi 10 messaggi nella stessa sessione | Ricordare conversazioni passate (la storia si azzera ad ogni ricarica) |
| Rispondere in italiano in modo conciso | Accedere a internet o a fonti esterne |
| Usare contenuti da Google Doc, Sheets e file .txt | Leggere file PDF (non supportati, vengono saltati in fase di sync) |

### Comportamento in caso di domanda senza risposta

Se nessun documento nella knowledge base è sufficientemente rilevante per la domanda (similarità < 0.65), l'assistente risponde:

> "Non ho trovato documenti rilevanti per rispondere a questa domanda."

Questo non è un errore — significa che l'informazione non è nei documenti sincronizzati, o che la domanda è troppo generica o in un formato molto diverso da come l'argomento è trattato nei documenti.

---

## Guida amministratore — Dashboard admin

### Accesso

La dashboard è disponibile all'indirizzo `/admin`. È protetta lato server: solo l'account con l'email configurata in `NUXT_ADMIN_EMAIL` può accedere alle API di ingestion e statistiche. Chiunque altro riceve un errore 403.

### Statistiche della Knowledge Base

Nella card **Knowledge Base** si trovano:

- **Chunk indicizzati** — numero totale di frammenti di testo presenti nel vector store.
- **Ultima sincronizzazione** — data e ora dell'ultima operazione di ingestion completata.
- **Stato ultima sync** — badge colorato:
  - 🟢 **completata** — l'ingestion è andata a buon fine
  - 🔴 **fallita** — si è verificato un errore critico
  - 🟡 **in corso** — l'ingestion è ancora in esecuzione (o si è bloccata)

### Come sincronizzare i documenti

1. Apri `/admin`.
2. Clicca **Sincronizza documenti**.
3. Il pulsante diventa grigio e mostra "Sincronizzazione in corso..." — attendere senza ricaricare la pagina. L'operazione può richiedere diversi minuti in base al numero di file e chunk da elaborare.
4. Al termine compare un riepilogo:
   - File processati
   - Chunk inseriti o aggiornati
   - Durata totale
   - Lista degli eventuali errori per singolo file

### Cosa fa la sincronizzazione

- Legge **ricorsivamente** tutti i file nella cartella Google Drive configurata in `NUXT_GOOGLE_DRIVE_FOLDER_ID`, incluse le sottocartelle.
- Scarica il testo di ogni file supportato.
- Divide il testo in chunk da ~500 parole con 50 parole di sovrapposizione tra chunk consecutivi (per non perdere contesto ai confini).
- Calcola l'embedding vettoriale per ogni chunk.
- Salva i chunk in Supabase con **upsert**: se un chunk con lo stesso `source_id` esiste già, viene aggiornato — quindi la sincronizzazione è **idempotente** e sicura da eseguire più volte.
- Registra l'intera operazione in `rag_ingestion_logs`.

### Quando eseguire la sincronizzazione

Eseguire una nuova sync ogni volta che:
- Vengono aggiunti nuovi documenti alla cartella Drive
- Viene modificato il contenuto di un documento esistente
- Vengono eliminate delle sezioni rilevanti da un documento

> La sync non elimina automaticamente i chunk di file rimossi dal Drive — se si vuole ripulire la knowledge base, occorre svuotare manualmente la tabella `rag_documents` e rieseguire la sync.

### Formati di file supportati

| Tipo file | Come viene letto |
|---|---|
| Google Documenti | Esportato come `text/plain` |
| Google Fogli | Esportato come `text/csv` |
| File `.txt` | Download diretto |
| PDF | **Non supportato** — saltato con log di avviso |
| Qualsiasi altro formato | **Non supportato** — saltato con log di avviso |

### Variabili d'ambiente necessarie

| Variabile | Descrizione |
|---|---|
| `NUXT_ADMIN_EMAIL` | Email dell'account admin con accesso alla dashboard |
| `NUXT_SUPABASE_SERVICE_ROLE_KEY` | Chiave service role di Supabase (operazioni privilegiate) |
| `NUXT_OPENROUTER_API_KEY` | Chiave API di OpenRouter |
| `NUXT_OPENROUTER_EMBEDDING_MODEL` | Modello di embedding (es. `qwen/qwen3-embedding-8b`) |
| `NUXT_OPENROUTER_CHAT_MODEL` | Modello di generazione (es. `google/gemini-2.0-flash-001`) |
| `NUXT_GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email del service account Google |
| `NUXT_GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Chiave privata del service account (con `\n` letterali) |
| `NUXT_GOOGLE_DRIVE_FOLDER_ID` | ID della cartella Google Drive da indicizzare |

---

## Note tecniche aggiuntive

### Sicurezza

- Le API `/api/assistant/ingest` e `/api/assistant/stats` verificano lato server che la richiesta provenga dall'admin — non è sufficiente essere autenticati, serve avere l'email corrispondente a `NUXT_ADMIN_EMAIL`.
- Il client Supabase admin usa la `service_role_key` che bypassa le Row Level Security policies — viene usato **solo** server-side, mai esposto al browser.
- La chiave privata del service account Google deve essere inserita nella variabile d'ambiente con i newline come `\n` letterali (come fa di solito il JSON scaricato da Google Cloud).

### Limiti e considerazioni

- **PDF non supportati**: il parsing di PDF richiede librerie pesanti; la scelta architetturale è di ignorarli e loggare un avviso. Convertire i PDF in Google Doc prima di metterli nella cartella Drive è la soluzione consigliata.
- **Contesto sessione**: la storia della conversazione viene mantenuta solo in-memory nel browser. Ricaricare la pagina azzera la sessione.
- **Costo API**: ogni messaggio inviato consuma una chiamata di embedding + una chiamata di completamento su OpenRouter. La sync consuma una chiamata di embedding per ogni chunk (potenzialmente centinaia).
- **Dimensione vettori**: il modello `qwen3-embedding-8b` produce vettori a 4096 dimensioni — la colonna `embedding` in Supabase deve essere `vector(4096)`.
