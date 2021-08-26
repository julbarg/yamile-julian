export interface LinkRef {
  name: string
  route: string
  id: string
}

export interface FAQResponse {
  answer?: string
  question?: string
  image?: string
  id: string
}

export interface Activity {
  id: string
  activity?: string
  description?: string
  icon?: string
  hour?: string
}

export interface Question {
  id: string
  question?: string
  options?: OptionByQuestion[]
  totalVotes?: number
}

export interface OptionByQuestion {
  id?: string
  option?: string
  numberVotes?: number
}

export interface Answers {
  [key: string]: string
}

export interface ConfirmResponse {
  id: string
  mainPerson?: string
  showAccommodation?: boolean
  family?: Person[]
}

export interface Person {
  id: string
  name?: string
  confirm?: boolean
  wantsAccommodation?: boolean
}

export interface Guest {
  id: string
  idFamily: string
  name?: string
  showAccommodation?: boolean
  confirm?: boolean
  wantsAccommodation?: boolean
}

export interface IPersonResult {
  id: string
  name?: string
  idFamily: string
}

export interface ConfirmedGuest {
  [key: string]: {
    idFamily: string
    confirm?: boolean
    wantsAccommodation?: boolean
  }
}