export interface IExtra {
  groupPoints: object[]
  searchHitIndex: number | null
}

export interface ISocio {
  fields: {
    "Nome Cognome": string
    "Luogo Nascita": string
    "Data Nascita": string // ISO date string
    Sesso: string
    "Codice Fiscale": string
    "Indirizzo Residenza": string
    "Provincia Residenza": string
    "Indirizzo Domicilio": string
    "Email Personale": string
    "Numero Cellulare": string
    "Email Jemp": string
    "Data Entrata": string // ISO date string
    "Anno Corso": number
    Matricola: number
    "Url Linkedin": string
  }
  name: string
  id: string
  autoNumber: number
  createdTime: string // ISO date string
  createdBy: string
}

export interface IPartecipazione {
  fields: {
    "Anagrafica Socio": {
      id: string
      title: string
    }
    Evento: {
      id: string
      title: string
    }
  }
  name: string
  id: string
  autoNumber: number
  createdTime: string // ISO date string
  createdBy: string
}

export interface ITableSoci {
  records: ISocio[]
  extra: IExtra
}

export interface ITablePartecipazioni {
  records: IPartecipazione[]
  extra: IExtra
}
