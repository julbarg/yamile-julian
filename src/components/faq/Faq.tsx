import React, { FunctionComponent } from 'react'
import { FAQResponse } from '../../types/Types'
import './Faq.scss'

const Faq: FunctionComponent<{ faqs: FAQResponse[] }> = ({ faqs }) => {
  return (
    <div className="faqs">
      <h2>Preguntas Frequentes</h2>
      <div className="faqs-container">
        {faqs.map((faq) => (
          <div className="faq" key={faq.id}>
            <h3>{faq.question}</h3>
            {faq.image ? <img src={faq.image} alt={faq.question} /> : null}
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Faq
