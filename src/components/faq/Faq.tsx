import React, { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { FAQResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import './Faq.scss'
import WhatsApp from '@material-ui/icons/WhatsApp'

const Faq: FunctionComponent = () => {
  const [faqs, setFaqs] = useState([] as FAQResponse[])
  const [loading, setLoading] = useState(true)

  const getFaqs = () => {
    const queryFaqs: FAQResponse[] = []
    db.collection('faq').onSnapshot(
      (faqSnapshot) => {
        faqSnapshot.forEach((faq) => {
          queryFaqs.push({
            ...faq.data(),
            id: faq.id,
          })
        })

        setFaqs(queryFaqs)
        setLoading(false)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  useEffect(() => {
    getFaqs()
  }, [])

  const iframe = (iframeHtml: string) => {
    return {
      __html: iframeHtml,
    }
  }

  return (
    <div className="faqs" id="faq">
      <h2>Preguntas frecuentes</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="faqs-container">
          {faqs.map((faq) => (
            <div className="faq" key={faq.id}>
              <h3>{faq.question}</h3>
              {faq.image ? <img src={faq.image} alt={faq.question} /> : null}
              {faq.iframe ? (
                <div
                  className="iframe-container"
                  dangerouslySetInnerHTML={iframe(faq.iframe)}
                />
              ) : null}
              {faq.answer ? <p>{faq.answer}</p> : null}
            </div>
          ))}
        </div>
      )}
      <div className="container-button">
        <a
          href="https://wa.me/573123089218"
          rel="noopener noreferrer"
          target="_blank"
        >
          <button className="button-whatsapp">
            <WhatsApp className="whatsapp" />
            WhatsApp
          </button>
        </a>
        <div>
          Si tienes alguna pregunta que no resolvimos, no dudes en contactarnos
          via WhatsApp
        </div>
      </div>
    </div>
  )
}

export default Faq
