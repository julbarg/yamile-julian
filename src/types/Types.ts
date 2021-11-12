export interface LinkRef {
  name: string
  route: string
  id: string
}

export interface FAQResponse {
  answer?: string | string[]
  question?: string
  image?: string
  iframe?: string
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

export interface IntroductionResponse {
  id?: string
  title?: string
  image?: string
  content?: string[]
}

export interface CreditResponse {
  id: string
  image?: string
  instagramAccount?: string
  instagramUrl?: string
}

export interface PlaceResponse {
  title?: string
  content?: string[]
  image?: string
  instagram?: string
  id: string
}
