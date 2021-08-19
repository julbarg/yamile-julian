export interface LinkRef {
  name: string
  route: string
  id: string
}

export interface FAQResponse {
  answer: string
  question: string
  image?: string
  id: string
}

export interface Activity {
  id: string
  activity: string
  description: string
  icon: string
  hour: string
}
