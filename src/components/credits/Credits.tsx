import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { CreditResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import './Credits.scss'

const Credits = () => {
  const [credits, setCredits] = useState([] as CreditResponse[])
  const [loading, setLoading] = useState(true)

  const getCredits = () => {
    const queryCredits: CreditResponse[] = []
    db.collection('credit').onSnapshot(
      (creditSnapshot) => {
        creditSnapshot.forEach((credit) => {
          queryCredits.push({
            ...credit.data(),
            id: credit.id,
          })
        })

        setCredits(queryCredits)
        setLoading(false)
      },
      (error) => {
        console.error(error)
      }
    )
  }

  useEffect(() => {
    getCredits()
  }, [])

  return (
    <div className="credits">
      {loading ? (
        <Loading />
      ) : (
        <div className="credits-container">
          {credits.map((credit) => (
            <div className="credit" key={credit.id}>
              <div className="credit-name">
                <img src={credit.image} alt="Logo Credit" />
              </div>
              <div className="credit-content">
                <a
                  href={credit.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <button className="button-instagram">
                    <span>${credit.instagramAccount}</span>
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Credits
