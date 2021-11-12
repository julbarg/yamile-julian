import React, { useEffect, useState } from 'react'
import { collection, query, getDocs, limit } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { IntroductionResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import { NavHashLink as Link } from 'react-router-hash-link'
import './Introduction.scss'

const Introduction = () => {
  const [introduction, setIntroduction] = useState({} as IntroductionResponse)
  const [loading, setLoading] = useState(true)

  const getIntroduction = async () => {
    try {
      const q = query(collection(db, 'introduction'), limit(1))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        setIntroduction({ ...doc.data(), id: doc.id })
      }
    } catch (error) {
      console.log('🚀 ~ getIntroduction ~ error:', error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void getIntroduction()
  }, [])
  return (
    <div className="introduction">
      <div className="introduction-container">
        {loading ? (
          <Loading color="white" />
        ) : (
          <>
            <h2>{introduction.title}</h2>
            {introduction.content?.map((item, index) => (
              <p key={`content-${index}`}>{item}</p>
            ))}
            <div className="container-button">
              <Link className="logo" to="/message">
                <button>Dejanos un mensaje</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Introduction
