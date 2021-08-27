import React, { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { FAQResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import './Faq.scss'

const Faq: FunctionComponent = () => {
  const [faqs, setFaqs] = useState([] as FAQResponse[])
  const [loadingFaq, setLoadingFaq] = useState(false)

  const getFaqs = () => {
    const queryFaqs: FAQResponse[] = []
    setLoadingFaq(true)
    db.collection('faq').onSnapshot(
      (faqSnapshot) => {
        faqSnapshot.forEach((faq) => {
          console.log(faq.data())

          queryFaqs.push({
            ...faq.data(),
            id: faq.id,
          })
        })

        setFaqs(queryFaqs)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  useEffect(() => {
    getFaqs()
  }, [])

  useEffect(() => {
    setLoadingFaq(false)
  }, [faqs])

  const iframe = (iframeHtml: string) => {
    return {
      __html: iframeHtml,
    }
  }

  return (
    <div className="faqs" id="faq">
      <h2>Preguntas frecuentes</h2>
      {loadingFaq ? (
        <Loading />
      ) : (
        <div className="faqs-container">
          {faqs.map((faq) => (
            <div className="faq" key={faq.id}>
              <h3>{faq.question}</h3>
              {faq.image ? <img src={faq.image} alt={faq.question} /> : null}
              {faq.iframe ? (
                <div dangerouslySetInnerHTML={iframe(faq.iframe)} />
              ) : null}
              {faq.answer ? <p>{faq.answer}</p> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Faq
