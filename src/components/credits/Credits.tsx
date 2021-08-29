import React from 'react'
import './Credits.scss'
import { useState } from 'react'
import { CreditResponse } from '../../types/Types'
import { db } from '../../config/firebase'
import { useEffect } from 'react'
import Loading from '../loading/Loading'
import Instagram from '@material-ui/icons/Instagram'

const Credits = () => {
  const [credits, setCredits] = useState([] as CreditResponse[])
  const [loading, setLoading] = useState(true)

  const getCredits = () => {
    const queryCredits: CreditResponse[] = []
    db.collection('credit').onSnapshot(
      (creditSnapshot) => {
        creditSnapshot.forEach((credit) => {
          queryCredits.push({
            id: credit.id,
            ...credit.data(),
          })
        })

        setCredits(queryCredits)
        setLoading(false)
      },
      (error) => {
        console.log(console.error(error))
      }
    )
  }

  useEffect(() => {
    getCredits()
  }, [])

  const renderCredits = () => (
    <div className="credits-container">
      {credits.map((credit) => (
        <div key={credit.id} className="credit">
          <div className="credit-name">
            <img src={credit.image} alt="Logo Credit" />

            <h3>{credit.title}</h3>
            <p className="subtitle">{credit.subtitle}</p>
          </div>

          <div className="credit-content">
            <p className="content">{credit.content}</p>
            <a
              href={credit.instagramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <button className="button-instagram">
                <Instagram className="whatsapp" />
                <span>{credit.instagramAccount}</span>
              </button>
            </a>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="credits">
      <h2>Con el apoyo de...</h2>
      {loading ? <Loading color="white" /> : renderCredits()}
    </div>
  )
}

export default Credits
