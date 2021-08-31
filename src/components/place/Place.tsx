import React, { FunctionComponent, useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { PlaceResponse } from '../../types/Types'
import Loading from '../loading/Loading'
import './Place.scss'

const Place: FunctionComponent = () => {
  const [place, setPlace] = useState({} as PlaceResponse)
  const [loading, setLoading] = useState(true)

  const getPlace = () => {
    db.collection('place')
      .limit(1)
      .onSnapshot(
        (placeSnapshot) => {
          if (!placeSnapshot.empty) {
            const queryPlace = placeSnapshot.docs[0].data()
            setPlace({ ...queryPlace, id: placeSnapshot.docs[0].id })
            setLoading(false)
          }
        },
        (error) => {
          console.error(error)
        }
      )
  }

  const htmlContent = (html: string) => {
    return {
      __html: html,
    }
  }

  useEffect(() => {
    getPlace()
  }, [])

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
