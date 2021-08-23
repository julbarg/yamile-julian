import { Activity, FAQResponse, Question } from '../../../types/Types'

export const faqs: FAQResponse[] = [
  {
    question: '¿Donde se llevara a cabo la ceremonia?',
    answer:
      'Velit labore laborum sint sit veniam tempor culpa magna. Quis incididunt non pariatur non id eu excepteur nostrud Lorem ipsum. Et eu nisi velit dolor nisi voluptate.',
    id: '1',
    image: './img/lavictoria.jpeg',
  },
  {
    question: '¿Donde se llevara a cabo la ceremonia?',
    answer:
      'Velit labore laborum sint sit veniam tempor culpa magna. Quis incididunt non pariatur non id eu excepteur nostrud Lorem ipsum. Et eu nisi velit dolor nisi voluptate.',
    id: '2',
    image: './img/lavictoria.jpeg',
  },
]

export const activities: Activity[] = [
  {
    id: 'ceremony',
    activity: 'La Ceremonia',
    description:
      'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
    icon: './img/wedding-rings.png',
    hour: '3:00pm',
  },
  {
    id: 'cheers',
    activity: 'El Brindis',
    description:
      'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
    icon: './img/champagne.png',
    hour: '5:00pm',
  },
  {
    id: 'eat',
    activity: 'La Comida',
    description:
      'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
    icon: './img/dinner.png',
    hour: '7:00pm',
  },
  {
    id: 'party',
    activity: 'La Fiesta',
    description:
      'Veniam consectetur magna quis anim exercitation esse pariatur incididunt fugiat ea. Irure tempor exercitation commodo adipisicing excepteur et culpa proident eu quis sint proident commodo. Quis non et et minim aute in elit mollit sit aliquip sunt. Ex sit aute voluptate non enim in. Proident deserunt tempor irure in non quis pariatur irure veniam id.',
    icon: './img/disco-ball.png',
    hour: '7:00pm',
  },
]

export const questions: Question[] = [
  {
    id: '1',
    question: 'Que es lo mas importante en la boda?',
    options: [
      {
        id: '1',
        description: 'La fiesta',
      },
      {
        id: '2',
        description: 'La comida',
      },
      {
        id: '3',
        description: 'La ceremonia',
      },
      {
        id: '4',
        description: 'Todas son importante',
      },
    ],
  },
  {
    id: '2',
    question: 'Por que estamos en este mundo?',
    options: [
      {
        id: '1',
        description: 'Para ser felices',
      },
      {
        id: '2',
        description: 'Por la comida',
      },
      {
        id: '3',
        description: 'A vivir',
      },
    ],
  },
  {
    id: '3',
    question: 'Donde prefieres las vacaciones?',
    options: [
      {
        id: '1',
        description: 'En la playa',
      },
      {
        id: '2',
        description: 'En la montaña',
      },
      {
        id: '3',
        description: 'En la casa',
      },
    ],
  },
]
