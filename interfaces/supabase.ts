export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  pgbouncer: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth: {
        Args: {
          p_usename: string
        }
        Returns: {
          username: string
          password: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      anagrafica_socio: {
        Row: {
          anno_corso: number
          auth_id: string | null
          codice_fiscale: string
          cognome: string
          data_entrata: string
          data_nascita: string
          data_uscita: string | null
          email_jemp: string
          email_personale: string
          id_socio: number
          indirizzo_domicilio: string
          indirizzo_residenza: string
          luogo_nascita: string
          matricola: number
          nome: string
          numero_cellulare: number
          provincia_residenza: string
          sesso: string
          url_linkedin: string | null
        }
        Insert: {
          anno_corso: number
          auth_id?: string | null
          codice_fiscale: string
          cognome: string
          data_entrata: string
          data_nascita: string
          data_uscita?: string | null
          email_jemp: string
          email_personale: string
          id_socio?: number
          indirizzo_domicilio: string
          indirizzo_residenza: string
          luogo_nascita: string
          matricola: number
          nome: string
          numero_cellulare: number
          provincia_residenza: string
          sesso: string
          url_linkedin?: string | null
        }
        Update: {
          anno_corso?: number
          auth_id?: string | null
          codice_fiscale?: string
          cognome?: string
          data_entrata?: string
          data_nascita?: string
          data_uscita?: string | null
          email_jemp?: string
          email_personale?: string
          id_socio?: number
          indirizzo_domicilio?: string
          indirizzo_residenza?: string
          luogo_nascita?: string
          matricola?: number
          nome?: string
          numero_cellulare?: number
          provincia_residenza?: string
          sesso?: string
          url_linkedin?: string | null
        }
        Relationships: []
      }
      appartenenza_area: {
        Row: {
          area: string
          data_fine: string | null
          data_inizio: string
          id_appartenenza_area: number
          id_socio: number
        }
        Insert: {
          area: string
          data_fine?: string | null
          data_inizio: string
          id_appartenenza_area?: number
          id_socio: number
        }
        Update: {
          area?: string
          data_fine?: string | null
          data_inizio?: string
          id_appartenenza_area?: number
          id_socio?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_appartenenza_area_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      azienda: {
        Row: {
          città: string
          email: string | null
          id_azienda: number
          indirizzo: string
          nome: string
          partita_iva: string
          provincia: string
          settore: string
          sito_web: string | null
          tipologia: string
        }
        Insert: {
          città: string
          email?: string | null
          id_azienda?: number
          indirizzo: string
          nome: string
          partita_iva: string
          provincia: string
          settore: string
          sito_web?: string | null
          tipologia: string
        }
        Update: {
          città?: string
          email?: string | null
          id_azienda?: number
          indirizzo?: string
          nome?: string
          partita_iva?: string
          provincia?: string
          settore?: string
          sito_web?: string | null
          tipologia?: string
        }
        Relationships: []
      }
      business_card: {
        Row: {
          avatar_url: string | null
          cognome: string | null
          email_jemp: string
          id: string
          nome: string | null
          numero_cellulare: number | null
          ruolo: string | null
          url_linkedin: string | null
        }
        Insert: {
          avatar_url?: string | null
          cognome?: string | null
          email_jemp: string
          id: string
          nome?: string | null
          numero_cellulare?: number | null
          ruolo?: string | null
          url_linkedin?: string | null
        }
        Update: {
          avatar_url?: string | null
          cognome?: string | null
          email_jemp?: string
          id?: string
          nome?: string | null
          numero_cellulare?: number | null
          ruolo?: string | null
          url_linkedin?: string | null
        }
        Relationships: []
      }
      candidato_recruitment: {
        Row: {
          anno_corso: number
          cognome: string
          facoltà: string
          id_candidato_recruitment: number
          id_recruitment: number
          mezzo_comunicazione: string
          nome: string
          passato: string
        }
        Insert: {
          anno_corso: number
          cognome: string
          facoltà: string
          id_candidato_recruitment?: number
          id_recruitment: number
          mezzo_comunicazione: string
          nome: string
          passato: string
        }
        Update: {
          anno_corso?: number
          cognome?: string
          facoltà?: string
          id_candidato_recruitment?: number
          id_recruitment?: number
          mezzo_comunicazione?: string
          nome?: string
          passato?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_candidato_recruitment_id_recruitment_fkey"
            columns: ["id_recruitment"]
            referencedRelation: "recruitment"
            referencedColumns: ["id_recruitment"]
          },
        ]
      }
      codici_presenza: {
        Row: {
          codice: number | null
          id: number
          id_evento: number | null
          id_riunione_generale: number | null
        }
        Insert: {
          codice?: number | null
          id?: number
          id_evento?: number | null
          id_riunione_generale?: number | null
        }
        Update: {
          codice?: number | null
          id?: number
          id_evento?: number | null
          id_riunione_generale?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "codici_presenza_id_evento_fkey"
            columns: ["id_evento"]
            referencedRelation: "evento"
            referencedColumns: ["id_evento"]
          },
          {
            foreignKeyName: "codici_presenza_id_riunione_generale_fkey"
            columns: ["id_riunione_generale"]
            referencedRelation: "riunione_generale"
            referencedColumns: ["id_riunione_generale"]
          },
        ]
      }
      condizione_socio: {
        Row: {
          attivo: boolean
          condizione: string
          data_fine: string | null
          data_inizio: string
          id_condizione_socio: number
          id_socio: number
        }
        Insert: {
          attivo: boolean
          condizione: string
          data_fine?: string | null
          data_inizio: string
          id_condizione_socio?: number
          id_socio: number
        }
        Update: {
          attivo?: boolean
          condizione?: string
          data_fine?: string | null
          data_inizio?: string
          id_condizione_socio?: number
          id_socio?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_condizione_socio_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      crm: {
        Row: {
          cognome: string
          email: string
          id_azienda: number
          id_crm: number
          id_partnership: number | null
          nome: string
          numero_cellulare: string
          ruolo: string
        }
        Insert: {
          cognome: string
          email: string
          id_azienda: number
          id_crm?: number
          id_partnership?: number | null
          nome: string
          numero_cellulare: string
          ruolo: string
        }
        Update: {
          cognome?: string
          email?: string
          id_azienda?: number
          id_crm?: number
          id_partnership?: number | null
          nome?: string
          numero_cellulare?: string
          ruolo?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_crm_id_azienda_fkey"
            columns: ["id_azienda"]
            referencedRelation: "azienda"
            referencedColumns: ["id_azienda"]
          },
          {
            foreignKeyName: "public_crm_id_partnership_fkey"
            columns: ["id_partnership"]
            referencedRelation: "partnership"
            referencedColumns: ["id_partnership"]
          },
        ]
      }
      customer_satisfaction: {
        Row: {
          altri_servizi: string
          azienda: string
          cognome: string
          commenti: string
          comprensione_esigenze: number
          consiglierebbe_jemp: string
          disponibilità: number
          flessibilità_team: string
          id_customer_satisfaction: number
          id_progetto: number
          motivo_collaborazione: string
          motivo_meno_2: string | null
          nome: string
          problematiche_riscontrate: string
          puntualità: string
          qualità_prezzo: string
          soddisfazione: string
          tempestività_trattativa: string
          tornerebbe: string
        }
        Insert: {
          altri_servizi: string
          azienda: string
          cognome: string
          commenti: string
          comprensione_esigenze: number
          consiglierebbe_jemp: string
          disponibilità: number
          flessibilità_team: string
          id_customer_satisfaction?: number
          id_progetto: number
          motivo_collaborazione: string
          motivo_meno_2?: string | null
          nome: string
          problematiche_riscontrate: string
          puntualità: string
          qualità_prezzo: string
          soddisfazione: string
          tempestività_trattativa: string
          tornerebbe: string
        }
        Update: {
          altri_servizi?: string
          azienda?: string
          cognome?: string
          commenti?: string
          comprensione_esigenze?: number
          consiglierebbe_jemp?: string
          disponibilità?: number
          flessibilità_team?: string
          id_customer_satisfaction?: number
          id_progetto?: number
          motivo_collaborazione?: string
          motivo_meno_2?: string | null
          nome?: string
          problematiche_riscontrate?: string
          puntualità?: string
          qualità_prezzo?: string
          soddisfazione?: string
          tempestività_trattativa?: string
          tornerebbe?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_customer_satisfaction_id_progetto_fkey"
            columns: ["id_progetto"]
            referencedRelation: "progetto"
            referencedColumns: ["id_progetto"]
          },
        ]
      }
      customer_satisfaction_short: {
        Row: {
          azienda: string
          cognome: string
          commenti: string
          competitività_economica: number
          efficacia: number
          id_customer_satisfaction_short: number
          id_lead: number
          motivazione_competitività_economica: string | null
          motivazione_efficacia: string | null
          motivazione_valutazione_pitch: string | null
          nome: string
          valutazione_pitch: number
        }
        Insert: {
          azienda: string
          cognome: string
          commenti: string
          competitività_economica: number
          efficacia: number
          id_customer_satisfaction_short?: number
          id_lead: number
          motivazione_competitività_economica?: string | null
          motivazione_efficacia?: string | null
          motivazione_valutazione_pitch?: string | null
          nome: string
          valutazione_pitch: number
        }
        Update: {
          azienda?: string
          cognome?: string
          commenti?: string
          competitività_economica?: number
          efficacia?: number
          id_customer_satisfaction_short?: number
          id_lead?: number
          motivazione_competitività_economica?: string | null
          motivazione_efficacia?: string | null
          motivazione_valutazione_pitch?: string | null
          nome?: string
          valutazione_pitch?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_customer_satisfaction_short_id_lead_fkey"
            columns: ["id_lead"]
            referencedRelation: "lead"
            referencedColumns: ["id_lead"]
          },
        ]
      }
      erasmus_socio: {
        Row: {
          data_fine: string | null
          data_inizio: string
          id_erasmus_socio: number
          id_socio: number
          nazione: string
          università: string
        }
        Insert: {
          data_fine?: string | null
          data_inizio: string
          id_erasmus_socio?: number
          id_socio: number
          nazione: string
          università: string
        }
        Update: {
          data_fine?: string | null
          data_inizio?: string
          id_erasmus_socio?: number
          id_socio?: number
          nazione?: string
          università?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_erasmus_socio_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      evento: {
        Row: {
          costo: number | null
          data: string
          durata: number
          id_evento: number
          id_recruitment: number | null
          nome: string
          numero_iscritti: number | null
          orario: string | null
          target: string
          tipologia: Database["public"]["Enums"]["evento_tipologia"]
        }
        Insert: {
          costo?: number | null
          data: string
          durata: number
          id_evento?: number
          id_recruitment?: number | null
          nome: string
          numero_iscritti?: number | null
          orario?: string | null
          target: string
          tipologia: Database["public"]["Enums"]["evento_tipologia"]
        }
        Update: {
          costo?: number | null
          data?: string
          durata?: number
          id_evento?: number
          id_recruitment?: number | null
          nome?: string
          numero_iscritti?: number | null
          orario?: string | null
          target?: string
          tipologia?: Database["public"]["Enums"]["evento_tipologia"]
        }
        Relationships: [
          {
            foreignKeyName: "public_evento_id_recruitment_fkey"
            columns: ["id_recruitment"]
            referencedRelation: "recruitment"
            referencedColumns: ["id_recruitment"]
          },
        ]
      }
      facoltà_socio: {
        Row: {
          data_fine: string | null
          data_inizio: string
          facoltà: string
          id_facoltà_socio: number
          id_socio: number
          tipologia: string
        }
        Insert: {
          data_fine?: string | null
          data_inizio: string
          facoltà: string
          id_facoltà_socio?: number
          id_socio: number
          tipologia: string
        }
        Update: {
          data_fine?: string | null
          data_inizio?: string
          facoltà?: string
          id_facoltà_socio?: number
          id_socio?: number
          tipologia?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_facoltà_socio_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      jemp_experience: {
        Row: {
          altre_considerazioni: string | null
          area_servizio_pm: string | null
          area_servizio_risorsa: string
          buddy: boolean
          carico_lavoro: string
          clima_fuori_jemp: string
          clima_jemp: string
          data: string
          formatività: string
          id_jemp_experience: number
          id_socio: number
          impegno_extra_jemp: string
          motivo_pm: string | null
          motivo_soddisfazione: string | null
          ore_extra_progetti: number
          ore_progetti: number
          periodo_pm: string | null
          responsabilità: string
          soddisfazione_area_attività: string
          soddisfazione_area_clima: string
          soddisfazione_jemp: string
          soddisfazione_riunioni_generali: string
          volontà_pm: boolean
        }
        Insert: {
          altre_considerazioni?: string | null
          area_servizio_pm?: string | null
          area_servizio_risorsa: string
          buddy: boolean
          carico_lavoro: string
          clima_fuori_jemp: string
          clima_jemp: string
          data: string
          formatività: string
          id_jemp_experience?: number
          id_socio: number
          impegno_extra_jemp: string
          motivo_pm?: string | null
          motivo_soddisfazione?: string | null
          ore_extra_progetti: number
          ore_progetti: number
          periodo_pm?: string | null
          responsabilità: string
          soddisfazione_area_attività: string
          soddisfazione_area_clima: string
          soddisfazione_jemp: string
          soddisfazione_riunioni_generali: string
          volontà_pm: boolean
        }
        Update: {
          altre_considerazioni?: string | null
          area_servizio_pm?: string | null
          area_servizio_risorsa?: string
          buddy?: boolean
          carico_lavoro?: string
          clima_fuori_jemp?: string
          clima_jemp?: string
          data?: string
          formatività?: string
          id_jemp_experience?: number
          id_socio?: number
          impegno_extra_jemp?: string
          motivo_pm?: string | null
          motivo_soddisfazione?: string | null
          ore_extra_progetti?: number
          ore_progetti?: number
          periodo_pm?: string | null
          responsabilità?: string
          soddisfazione_area_attività?: string
          soddisfazione_area_clima?: string
          soddisfazione_jemp?: string
          soddisfazione_riunioni_generali?: string
          volontà_pm?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "public_jemp_experience_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      jemp_future: {
        Row: {
          alumnizzazione: string
          data: string
          erasmus: string
          futuro_prossimo: string
          id_jemp_future: number
          id_socio: number
        }
        Insert: {
          alumnizzazione: string
          data: string
          erasmus: string
          futuro_prossimo: string
          id_jemp_future?: number
          id_socio: number
        }
        Update: {
          alumnizzazione?: string
          data?: string
          erasmus?: string
          futuro_prossimo?: string
          id_jemp_future?: number
          id_socio?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_jemp_future_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      job_offers: {
        Row: {
          content: string
          created_at: string
          description: string
          id: number
          poster_id: string
          poster_name: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          description: string
          id?: number
          poster_id: string
          poster_name: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          description?: string
          id?: number
          poster_id?: string
          poster_name?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_offers_poster_id_fkey"
            columns: ["poster_id"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["auth_id"]
          },
        ]
      }
      lead: {
        Row: {
          data_accetazione_preventivo: string | null
          data_invio_contratto: string | null
          data_invio_preventivo: string | null
          data_presentazione_pitch: string | null
          data_primo_contatto: string
          data_primo_incontro: string | null
          descrizione: string | null
          esternalizzazione: boolean
          esternalizzazione_chi: string | null
          generazione_lead: string
          id_crm: number
          id_lead: number
          lead_critico: boolean
          trattativa_interrotta_chi: string | null
          trattativa_interrotta_data: string | null
          trattativa_interrotta_momento: string | null
          trattativa_interrotta_motivo: string | null
          volontà_lavorare_con_jemp: string
        }
        Insert: {
          data_accetazione_preventivo?: string | null
          data_invio_contratto?: string | null
          data_invio_preventivo?: string | null
          data_presentazione_pitch?: string | null
          data_primo_contatto: string
          data_primo_incontro?: string | null
          descrizione?: string | null
          esternalizzazione: boolean
          esternalizzazione_chi?: string | null
          generazione_lead: string
          id_crm: number
          id_lead?: number
          lead_critico: boolean
          trattativa_interrotta_chi?: string | null
          trattativa_interrotta_data?: string | null
          trattativa_interrotta_momento?: string | null
          trattativa_interrotta_motivo?: string | null
          volontà_lavorare_con_jemp: string
        }
        Update: {
          data_accetazione_preventivo?: string | null
          data_invio_contratto?: string | null
          data_invio_preventivo?: string | null
          data_presentazione_pitch?: string | null
          data_primo_contatto?: string
          data_primo_incontro?: string | null
          descrizione?: string | null
          esternalizzazione?: boolean
          esternalizzazione_chi?: string | null
          generazione_lead?: string
          id_crm?: number
          id_lead?: number
          lead_critico?: boolean
          trattativa_interrotta_chi?: string | null
          trattativa_interrotta_data?: string | null
          trattativa_interrotta_momento?: string | null
          trattativa_interrotta_motivo?: string | null
          volontà_lavorare_con_jemp?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_lead_id_crm_fkey"
            columns: ["id_crm"]
            referencedRelation: "crm"
            referencedColumns: ["id_crm"]
          },
        ]
      }
      organizzatore_esterno_evento: {
        Row: {
          id_crm: number
          id_evento: number
          id_organizzatore_esterno_evento: number
        }
        Insert: {
          id_crm: number
          id_evento: number
          id_organizzatore_esterno_evento?: number
        }
        Update: {
          id_crm?: number
          id_evento?: number
          id_organizzatore_esterno_evento?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_organizzatore_evento_id_crm_fkey"
            columns: ["id_crm"]
            referencedRelation: "crm"
            referencedColumns: ["id_crm"]
          },
          {
            foreignKeyName: "public_organizzatore_evento_id_evento_fkey"
            columns: ["id_evento"]
            referencedRelation: "evento"
            referencedColumns: ["id_evento"]
          },
        ]
      }
      organizzatore_interno_evento: {
        Row: {
          id_evento: number
          id_organizzatore_interno_evento: number
          id_socio: number
        }
        Insert: {
          id_evento: number
          id_organizzatore_interno_evento?: number
          id_socio: number
        }
        Update: {
          id_evento?: number
          id_organizzatore_interno_evento?: number
          id_socio?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_organizzatore_interno_evento_id_evento_fkey"
            columns: ["id_evento"]
            referencedRelation: "evento"
            referencedColumns: ["id_evento"]
          },
          {
            foreignKeyName: "public_organizzatore_interno_evento_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      partecipazione_esterna: {
        Row: {
          cognome: string
          id_evento: number | null
          id_partecipazione_esterna: number
          id_riunione_generale: number | null
          nome: string
          tipologia: string
        }
        Insert: {
          cognome: string
          id_evento?: number | null
          id_partecipazione_esterna?: number
          id_riunione_generale?: number | null
          nome: string
          tipologia: string
        }
        Update: {
          cognome?: string
          id_evento?: number | null
          id_partecipazione_esterna?: number
          id_riunione_generale?: number | null
          nome?: string
          tipologia?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_partecipazione_esterna_id_evento_fkey"
            columns: ["id_evento"]
            referencedRelation: "evento"
            referencedColumns: ["id_evento"]
          },
          {
            foreignKeyName: "public_partecipazione_esterna_id_riunione_generale_fkey"
            columns: ["id_riunione_generale"]
            referencedRelation: "riunione_generale"
            referencedColumns: ["id_riunione_generale"]
          },
        ]
      }
      partecipazione_interna_evento: {
        Row: {
          id_evento: number
          id_partecipazione_interna_evento: number
          id_socio: number
        }
        Insert: {
          id_evento: number
          id_partecipazione_interna_evento?: number
          id_socio: number
        }
        Update: {
          id_evento?: number
          id_partecipazione_interna_evento?: number
          id_socio?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_partecipazione_interna_evento_id_evento_fkey"
            columns: ["id_evento"]
            referencedRelation: "evento"
            referencedColumns: ["id_evento"]
          },
          {
            foreignKeyName: "public_partecipazione_interna_evento_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      partecipazione_interna_riunione_generale: {
        Row: {
          id_partecipazione_interna_riunione_generale: number
          id_riunione_generale: number
          id_socio: number
        }
        Insert: {
          id_partecipazione_interna_riunione_generale?: number
          id_riunione_generale: number
          id_socio: number
        }
        Update: {
          id_partecipazione_interna_riunione_generale?: number
          id_riunione_generale?: number
          id_socio?: number
        }
        Relationships: [
          {
            foreignKeyName: "partecipazione_interna_riunione_gener_id_riunione_generale_fkey"
            columns: ["id_riunione_generale"]
            referencedRelation: "riunione_generale"
            referencedColumns: ["id_riunione_generale"]
          },
          {
            foreignKeyName: "partecipazione_interna_riunione_generale_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      partecipazione_lead: {
        Row: {
          id_lead: number
          id_partecipazione_lead: number
          id_socio: number
          ruolo: string
        }
        Insert: {
          id_lead: number
          id_partecipazione_lead?: number
          id_socio: number
          ruolo: string
        }
        Update: {
          id_lead?: number
          id_partecipazione_lead?: number
          id_socio?: number
          ruolo?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_partecipazione_lead_id_lead_fkey"
            columns: ["id_lead"]
            referencedRelation: "lead"
            referencedColumns: ["id_lead"]
          },
          {
            foreignKeyName: "public_partecipazione_lead_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      partecipazione_progetto: {
        Row: {
          data_fine: string | null
          data_inizio: string
          id_partecipazione_progetto: number
          id_progetto: number
          id_socio: number
          ruolo: string
        }
        Insert: {
          data_fine?: string | null
          data_inizio: string
          id_partecipazione_progetto?: number
          id_progetto: number
          id_socio: number
          ruolo: string
        }
        Update: {
          data_fine?: string | null
          data_inizio?: string
          id_partecipazione_progetto?: number
          id_progetto?: number
          id_socio?: number
          ruolo?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_partecipazione_progetto_id_progetto_fkey"
            columns: ["id_progetto"]
            referencedRelation: "progetto"
            referencedColumns: ["id_progetto"]
          },
          {
            foreignKeyName: "public_partecipazione_progetto_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      partnership: {
        Row: {
          data_fine: string | null
          data_inizio: string
          id_partnership: number
          nome: string
          tipologia: Database["public"]["Enums"]["partnership_tipologia"]
        }
        Insert: {
          data_fine?: string | null
          data_inizio: string
          id_partnership?: number
          nome: string
          tipologia: Database["public"]["Enums"]["partnership_tipologia"]
        }
        Update: {
          data_fine?: string | null
          data_inizio?: string
          id_partnership?: number
          nome?: string
          tipologia?: Database["public"]["Enums"]["partnership_tipologia"]
        }
        Relationships: []
      }
      progetto: {
        Row: {
          costo: number | null
          data_fine_preventivo: string
          data_fine_reale: string | null
          data_inizio: string
          fatturato: number | null
          id_lead: number
          id_progetto: number
          nome: string
          ore_preventivo: number
          ore_reali: number | null
          tipologia: string
        }
        Insert: {
          costo?: number | null
          data_fine_preventivo: string
          data_fine_reale?: string | null
          data_inizio: string
          fatturato?: number | null
          id_lead: number
          id_progetto?: number
          nome: string
          ore_preventivo: number
          ore_reali?: number | null
          tipologia: string
        }
        Update: {
          costo?: number | null
          data_fine_preventivo?: string
          data_fine_reale?: string | null
          data_inizio?: string
          fatturato?: number | null
          id_lead?: number
          id_progetto?: number
          nome?: string
          ore_preventivo?: number
          ore_reali?: number | null
          tipologia?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_progetto_id_lead_fkey"
            columns: ["id_lead"]
            referencedRelation: "lead"
            referencedColumns: ["id_lead"]
          },
        ]
      }
      recruitment: {
        Row: {
          anno: number
          costo: number
          id_progetto: number
          id_recruitment: number
          mese: number
        }
        Insert: {
          anno: number
          costo: number
          id_progetto: number
          id_recruitment?: number
          mese: number
        }
        Update: {
          anno?: number
          costo?: number
          id_progetto?: number
          id_recruitment?: number
          mese?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_recruitment_id_progetto_fkey"
            columns: ["id_progetto"]
            referencedRelation: "progetto"
            referencedColumns: ["id_progetto"]
          },
        ]
      }
      rifiuto_progetto: {
        Row: {
          data: string
          id_progetto: number
          id_rifiuto_progetto: number
          id_socio: number
          motivazione: string
          ruolo: string
        }
        Insert: {
          data: string
          id_progetto: number
          id_rifiuto_progetto?: number
          id_socio: number
          motivazione: string
          ruolo: string
        }
        Update: {
          data?: string
          id_progetto?: number
          id_rifiuto_progetto?: number
          id_socio?: number
          motivazione?: string
          ruolo?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_rifiuto_progetto_id_progetto_fkey"
            columns: ["id_progetto"]
            referencedRelation: "progetto"
            referencedColumns: ["id_progetto"]
          },
          {
            foreignKeyName: "public_rifiuto_progetto_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      riunione_generale: {
        Row: {
          data: string
          id_riunione_generale: number
        }
        Insert: {
          data: string
          id_riunione_generale?: number
        }
        Update: {
          data?: string
          id_riunione_generale?: number
        }
        Relationships: []
      }
      ruoli_socio: {
        Row: {
          data_fine: string | null
          data_inizio: string
          id_ruolo_socio: number
          id_socio: number
          ruolo: string
        }
        Insert: {
          data_fine?: string | null
          data_inizio: string
          id_ruolo_socio?: number
          id_socio: number
          ruolo: string
        }
        Update: {
          data_fine?: string | null
          data_inizio?: string
          id_ruolo_socio?: number
          id_socio?: number
          ruolo?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_ruoli_socio_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      ruolo_lavoro: {
        Row: {
          data_fine: string | null
          data_inizio: string | null
          id_azienda: number
          id_ruolo_lavoro: number
          id_socio: number
          nome: string | null
          tipologia_contratto: string | null
        }
        Insert: {
          data_fine?: string | null
          data_inizio?: string | null
          id_azienda: number
          id_ruolo_lavoro?: number
          id_socio: number
          nome?: string | null
          tipologia_contratto?: string | null
        }
        Update: {
          data_fine?: string | null
          data_inizio?: string | null
          id_azienda?: number
          id_ruolo_lavoro?: number
          id_socio?: number
          nome?: string | null
          tipologia_contratto?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_ruolo_lavoro_id_azienda_fkey"
            columns: ["id_azienda"]
            referencedRelation: "azienda"
            referencedColumns: ["id_azienda"]
          },
          {
            foreignKeyName: "public_ruolo_lavoro_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      servizio_richiesto: {
        Row: {
          area: string
          id_lead: number
          id_servizio_richiesto: number
          nome: string
        }
        Insert: {
          area: string
          id_lead: number
          id_servizio_richiesto?: number
          nome: string
        }
        Update: {
          area?: string
          id_lead?: number
          id_servizio_richiesto?: number
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_servizio_richiesto_id_lead_fkey"
            columns: ["id_lead"]
            referencedRelation: "lead"
            referencedColumns: ["id_lead"]
          },
        ]
      }
      stato_socio: {
        Row: {
          data_fine: string | null
          data_inizio: string
          id_socio: number
          id_stato_socio: number
          stato: string
        }
        Insert: {
          data_fine?: string | null
          data_inizio: string
          id_socio: number
          id_stato_socio?: number
          stato: string
        }
        Update: {
          data_fine?: string | null
          data_inizio?: string
          id_socio?: number
          id_stato_socio?: number
          stato?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_stato_socio_id_socio_fkey"
            columns: ["id_socio"]
            referencedRelation: "anagrafica_socio"
            referencedColumns: ["id_socio"]
          },
        ]
      }
      survey_workshop: {
        Row: {
          durata: string | null
          id_evento: number
          id_survey_workshop: number
          interesse_argomento: string | null
          motivo_mancata_partecipazione: string | null
          partecipazione: boolean
          qualità_ospiti: string | null
          soddisfazione: string | null
          suggerimenti: string | null
          voglia_approfondire: boolean | null
        }
        Insert: {
          durata?: string | null
          id_evento: number
          id_survey_workshop?: number
          interesse_argomento?: string | null
          motivo_mancata_partecipazione?: string | null
          partecipazione: boolean
          qualità_ospiti?: string | null
          soddisfazione?: string | null
          suggerimenti?: string | null
          voglia_approfondire?: boolean | null
        }
        Update: {
          durata?: string | null
          id_evento?: number
          id_survey_workshop?: number
          interesse_argomento?: string | null
          motivo_mancata_partecipazione?: string | null
          partecipazione?: boolean
          qualità_ospiti?: string | null
          soddisfazione?: string | null
          suggerimenti?: string | null
          voglia_approfondire?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_survey_workshop_id_evento_fkey"
            columns: ["id_evento"]
            referencedRelation: "evento"
            referencedColumns: ["id_evento"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_presenza_interna: {
        Args: {
          code: number
        }
        Returns: string
      }
    }
    Enums: {
      evento_tipologia:
        | "Workshop"
        | "Formazione Area"
        | "Evento Network"
        | "Evento Recruitment"
        | "Evento Politecnico"
        | "Evento Alumni"
        | "Assemblea Generale"
        | "Teambuilding"
        | "Evento Commerciale"
      partnership_tipologia:
        | "StartUp"
        | "PMI"
        | "Grande Azienda"
        | "Libero Professionista"
        | "JE"
        | "JEE"
        | "Associazione"
        | "Scuola/Università"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
