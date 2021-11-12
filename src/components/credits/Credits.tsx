import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { CreditResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import { useAuth } from '../../context/AuthContext'
import './Credits.scss'

const Credits = () => {
  const { user } = useAuth()
  const [credits, setCredits] = useState([] as CreditResponse[])
  const [loading, setLoading] = useState(true)

  const getCredits = async () => {
    try {
      const queryCredits: CreditResponse[] = []
      const querySnapshot = await getDocs(collection(db, 'credit'))

      querySnapshot.forEach((credit) => {
        queryCredits.push({
          ...credit.data(),
            id: credit.id,
        })
      })
      setCredits(queryCredits)
    } catch (error) {
      console.log("🚀 ~ getCredits ~ error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    user && getCredits()
  }, [user])

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
                    <span>{credit.instagramAccount}</span>
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
