import React from 'react'
import Faq from '../../components/faq/Faq'
import Header from '../../components/layout/header/Header'
import { FAQResponse } from '../../types/Types'
import './HomePage.css'

const HomePage = () => {
  const faqs: FAQResponse[] = [
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
  return (
    <div className="home-page">
      <Header />
      <Faq faqs={faqs} />
    </div>
  )
}

export default HomePage
