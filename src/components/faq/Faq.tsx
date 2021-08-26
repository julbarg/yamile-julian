import React, { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { FAQResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import './Faq.scss'

const Faq: FunctionComponent = () => {
  const [faqs, setFaqs] = useState([] as FAQResponse[])
  const [loading, setLoading] = useState(false)

  const getFaqs = () => {
    const queryFaqs: FAQResponse[] = []
    setLoading(true)
    db.collection('faq').onSnapshot((faqSnapshot) => {
      faqSnapshot.forEach((faq) => {
        queryFaqs.push({
          ...faq.data(),
          id: faq.id,
        })
      })

      setFaqs(queryFaqs)
      setLoading(false)
    })
  }

  useEffect(() => {
    getFaqs()
  }, [])

  return (
    <div className="faqs" id="faq">
      <h2>Preguntas Frequentes</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="faqs-container">
          {faqs.map((faq) => (
            <div className="faq" key={faq.id}>
              <h3>{faq.question}</h3>
              {faq.image ? <img src={faq.image} alt={faq.question} /> : null}
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Faq
