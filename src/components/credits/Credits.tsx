import React from 'react'
import './Credits.scss'
import { useState } from 'react'
import { CreditResponse } from '../../types/Types'
import { db } from '../../config/firebase'
import { useEffect } from 'react'
import Loading from '../loading/Loading'

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
          <div className="credit-header">
            <img src={credit.image} alt="Logo Credit" />
          </div>
          <div className="credit-content">
            <a
              href="https://www.instagram.com/lovelyweddingsbodas/"
              target="_blank"
              rel="noreferrer"
            >
              <h3>{credit.title}</h3>
            </a>
            <p className="subtitle">{credit.subtitle}</p>
            <p className="content">{credit.content}</p>
          </div>
          <div className="credit-social">
            <a href={credit.instagramUrl} target="_blank" rel="noreferrer">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/yamile-julian.appspot.com/o/yamile-julian%2Fassets%2Finstagram.png?alt=media&token=7ad6abbe-0b81-4b05-a76e-e5cc4c6ea79a"
                width={22}
                height={22}
                alt=""
              />
              <span>{credit.instagramAccount}</span>
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
