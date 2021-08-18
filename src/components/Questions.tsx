import React, { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../config/firebase'

interface FAQ {
  id: string
  question?: string
  answer?: string
}

const Questions: FunctionComponent = () => {
  const [faqs, setFaqs] = useState([] as FAQ[])

  const getFAQ = () => {
    db.collection('faq').onSnapshot((snapshot) => {
      const faqsResult: FAQ[] = []
      snapshot.forEach((doc) => faqsResult.push({ ...doc.data(), id: doc.id }))

      setFaqs(faqsResult)
    })
  }
  useEffect(() => {
    getFAQ()
  }, [])

  return (
    <>
      <h2>Preguntas Frequentes</h2>
      {faqs.map((faq) => {
        return (
          <div key={faq.id}>
            <h3 style={{ fontWeight: 'bold' }}>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        )
      })}
    </>
  )
}

export default Questions
