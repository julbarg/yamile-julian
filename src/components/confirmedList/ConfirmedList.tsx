import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'

import { DBContext } from '../../App'
import { Person } from '../../types/Types'
import Loading from '../loading/Loading'
import './ConfirmedList.scss'

const ConfirmedList = () => {
  const [loading, setLoading] = useState(true)
  const [confirmedPeople, setConfirmedPeople] = useState([] as Person[])
  const db = useContext(DBContext)

  const getConfirmResponse = async () => {
    try {
      const confirmRef = collection(db, 'confirm')
      const activeRef = await getDocs(confirmRef)

      const queryConfirmedPeople: Person[] = []
      for (const confirm of activeRef.docs) {
        const familyRef = collection(db, `confirm/${confirm.id}/family`)
        const familyQuery = query(familyRef, where('confirm', '==', true))
        const familySnapshot = await getDocs(familyQuery)

        for (const person of familySnapshot.docs) {
          queryConfirmedPeople.push({
            id: person.id,
            ...person.data(),
          })
        }
      }

      setConfirmedPeople(queryConfirmedPeople)
    } catch (error) {
      console.error('Error getting confirmed people: ', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getConfirmResponse()
  }, [])

  const renderConfirmedList = () => {
    let numberPeopleWithAccommodation = 0
    return (
      <div className="confirmed-list-container">
        {confirmedPeople.map((person) => {
          if (person.wantsAccommodation) numberPeopleWithAccommodation++
          return (
            <div className="person box-shadow" key={person.id}>
              <div>{person.name}</div>
              <div>
                <strong>
                  {person.wantsAccommodation ? 'Con hospedaje' : ''}
                </strong>
              </div>
            </div>
          )
        })}
        <div className="number box-shadow">
          Número de personas confirmadas:{' '}
          <strong>{confirmedPeople.length}</strong>
          <br />
          Número de personas con hospedaje:{' '}
          <strong>{numberPeopleWithAccommodation}</strong>
        </div>
      </div>
    )
  }

  return (
    <div className="confirmed-list">
      <h2>Lista de confirmados</h2>
      {loading ? <Loading /> : renderConfirmedList()}
    </div>
  )
}

export default ConfirmedList
