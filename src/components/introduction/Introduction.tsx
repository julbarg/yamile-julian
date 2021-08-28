import React, { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { IntroductionResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import { NavHashLink as Link } from 'react-router-hash-link'
import './Introduction.scss'

const Introduction = () => {
  const [introduction, setIntroduction] = useState({} as IntroductionResponse)
  const [loading, setLoading] = useState(true)

  const getIntroduction = () => {
    db.collection('introduction')
      .limit(1)
      .onSnapshot(
        (introductionSnapshot) => {
          if (!introductionSnapshot.empty) {
            const queryIntroduction = introductionSnapshot.docs[0].data()
            setIntroduction({ ...queryIntroduction })
            setLoading(false)
          }
        },
        (error) => {
          console.error(error)
        }
      )
  }

  useEffect(() => {
    void getIntroduction()
  }, [])
  return (
    <div className="introduction">
      <div className="introduction-container">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2>{introduction.title}</h2>
            <div className="image-container">
              <img src={introduction.image} alt="Wedding" />
            </div>
            {introduction.content?.map((item, index) => (
              <p key={`content-${index}`}>{item}</p>
            ))}
            <div className="container-button">
              <Link className="logo" to="/message">
                <button>Dejanos un mensake</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Introduction
