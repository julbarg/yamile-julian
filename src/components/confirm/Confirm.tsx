import React, { useContext, useEffect, useState } from 'react'
import './Confirm.scss'
import { DBContext } from '../../App'
import {
  ConfirmedGuest,
  ConfirmResponse,
  Guest,
  IPersonResult,
  Person,
} from '../../types/Types'
import PersonResults from './personResults/PersonResults'
import PersonSearch from './personSearch/PersonSearch'
import PersonConfirm from './personConfirm/PersonConfirm'
import Loading from '../loading/Loading'

const Confirm = () => {
  const [confirmResponse, setConfirmResponse] = useState(
    [] as ConfirmResponse[]
  )
  const [showSelect, setShowSelect] = useState(false)
  const [guests, setGuests] = useState([] as Guest[])
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [filteredGuest, setFilteredGuest] = useState([] as IPersonResult[])
  const [membersOfFamily, setMembersOfFamily] = useState([] as Guest[])
  const [showAccommodation, setShowAccommodation] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const db = useContext(DBContext)

  const getConfirmResponse = async () => {
    setLoading(true)
    const confirmRef = db.collection('confirm')
    const activeRef = await confirmRef.get()
    const queryConfirm: ConfirmResponse[] = []

    for (const confirm of activeRef.docs) {
      const personRef = await confirmRef
        .doc(confirm.id)
        .collection('family')
        .get()
      const queryFamily: Person[] = []

      for (const person of personRef.docs) {
        queryFamily.push({
          id: person.id,
          ...person.data(),
        })
      }

      queryConfirm.push({
        id: confirm.id,
        family: queryFamily,
        ...confirm.data(),
      })
    }

    setConfirmResponse(queryConfirm)
    setLoading(false)
  }

  useEffect(() => {
    getConfirmResponse()
  }, [])

  useEffect(() => {
    setGuests(mapConfirmArrayToGuestArray(confirmResponse))
  }, [confirmResponse])

  const mapConfirmArrayToGuestArray = (
    confirmResponse: ConfirmResponse[]
  ): Guest[] => {
    const resultGuests: Guest[] = []
    confirmResponse.forEach((confirm) => {
      confirm.family?.forEach((person) => {
        resultGuests.push({
          id: person.id,
          idFamily: confirm.id,
          showAccommodation: confirm.showAccommodation,
          name: person.name,
          confirm: person.confirm,
          wantsAccommodation: person.wantsAccommodation,
        })
      })
    })

    return resultGuests
  }

  const search = (name: string) => {
    const nameParts = name.split(/\s+/)
    const filtered: IPersonResult[] = guests
      .filter(({ name }) => {
        const nameNormalize = name
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toUpperCase()

        return nameParts.every((part) => {
          const partNormalize = part
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()

          return nameNormalize?.includes(partNormalize)
        })
      })
      .map((guest) => ({
        id: guest.id,
        name: guest.name,
        idFamily: guest.idFamily,
      }))

    setFilteredGuest(filtered)
    setShowSelect(true)
    setShowConfirm(false)
  }

  const getFamily = (idFamily: string) => {
    if (idFamily.length == 0) return
    const filteredGuest = guests.filter((guest) => guest.idFamily == idFamily)
    setShowAccommodation(filteredGuest.some((guest) => guest.showAccommodation))

    setMembersOfFamily(filteredGuest)
    setShowConfirm(true)
  }

  const confirm = async (confirmedMembersOfFamily: ConfirmedGuest) => {
    setLoading(true)
    for (const key in confirmedMembersOfFamily) {
      const guest = confirmedMembersOfFamily[key]
      await db
        .collection('confirm')
        .doc(guest.idFamily)
        .collection('family')
        .doc(key)
        .update({
          confirm: guest.confirm,
          wantsAccommodation: guest.confirm && guest.wantsAccommodation,
        })
    }
    getConfirmResponse()
    setShowResult(true)
    setLoading(false)
  }

  const reset = () => {
    setShowResult(false)
    setShowSelect(false)
    setShowConfirm(false)
    setMembersOfFamily([])
  }

  const renderResult = () => (
    <div className="loading">
      <h3>Gracias Por Confirmar tu Asistencia. </h3>
      <h3>Nos vemos pronto</h3>
      <button className="button-reset box-shadow" onClick={reset}>
        Realizar otra busqueda
      </button>
    </div>
  )

  const renderConfirmForm = () => {
    return (
      <div className="confirm-container">
        <PersonSearch onSubmit={search} />
        {showSelect ? (
          <PersonResults people={filteredGuest} onClick={getFamily} />
        ) : null}
        {showConfirm ? (
          <PersonConfirm
            people={membersOfFamily}
            showAccommodation={showAccommodation}
            onSubmit={confirm}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div className="confirm">
      <h2>Confirmar Asistencia</h2>
      {}
      {loading ? (
        <Loading />
      ) : showResult ? (
        renderResult()
      ) : (
        renderConfirmForm()
      )}
    </div>
  )
}

export default Confirm
