import React, { FunctionComponent, useEffect, useState } from 'react'
import { collection, query, getDocs, limit } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { PlaceResponse } from '../../types/Types'
import { htmlContent } from '../../util/HtmlUtil'
import Loading from '../loading/Loading'
import { useAuth } from '../../context/AuthContext'
import './Place.scss'

const Place: FunctionComponent = () => {
  const { user } = useAuth()
  const [place, setPlace] = useState({} as PlaceResponse)
  const [loading, setLoading] = useState(true)

  const getPlace = async () => {
    try {
      const q = query(collection(db, 'place'), limit(1))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        setPlace({ ...doc.data(), id: doc.id })
      }
    } catch (error) {
      console.log('🚀 ~ getPlace ~ error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    user && getPlace()
  }, [user])

  const renderParagrap = (paragraph: string, index: number) => {
    return (
      <p
        key={`${place.id} - ${index}`}
        dangerouslySetInnerHTML={htmlContent(paragraph)}
      />
    )
  }

  return (
    <div className="place" id="faq">
      <h2>¡Tenemos lugar!</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="place-container">
          {place.image ? <img src={place.image} alt={place.title} /> : null}
          {place.content ? place.content.map(renderParagrap) : null}
        </div>
      )}
    </div>
  )
}

export default Place
