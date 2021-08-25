import React, { ChangeEvent, useEffect, useState } from 'react'
import './Confirm.scss'
import { db } from '../../config/firebase'
import {
  ConfirmedGuest,
  ConfirmResponse,
  Guest,
  Person,
} from '../../types/Types'
import ReactLoading from 'react-loading'

const Confirm = () => {
  const [guests, setGuests] = useState([] as Guest[])
  const [loading, setLoading] = useState(false)
  const [selectActive, setSelectActive] = useState(false)
  const [confirmActive, setConfirmActive] = useState(false)
  const [name, setName] = useState('' as string)
  const [filteredGuest, setFilteredGuest] = useState([] as Guest[])
  const [membersOfFamily, setMembersOfFamily] = useState([] as Guest[])
  const [confirmedMembersOfFamily, setConfirmedMembersOfFamily] = useState(
    {} as ConfirmedGuest
  )
  const [showAccommodation, setShowAccommodation] = useState(false)
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [
    isAllSelectedWithAccommodation,
    setIsAllSelectedWithAccommodation,
  ] = useState(false)

  const getConfirm = async () => {
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

    setGuests(mapConfirmArrayToGuestArray(queryConfirm))
    console.log(guests)
    setLoading(false)
  }

  /*useEffect(() => {
    getConfirm()
  }, [])*/

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

  const renderLoading = () => (
    <div className="loading">
      <div className="loading-title">Cargando...</div>
      <ReactLoading type="bars" color="#3f4551" width={72} />
    </div>
  )

  useEffect(() => {
    setConfirmActive(false)
    const nameParts = name.split(/\s+/)
    const filtered = guests.filter(({ name }) => {
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
    setFilteredGuest(filtered)
    setSelectActive(true)
    setIsAllSelected(filtered.every((guest) => guest.confirm))
    setIsAllSelectedWithAccommodation(
      filtered.every((guest) => guest.wantsAccommodation)
    )
  }, [guests, name])

  const getFamily = (idFamily: string) => {
    const filteredGuest = guests.filter((guest) => guest.idFamily == idFamily)

    setShowAccommodation(filteredGuest.some((guest) => guest.showAccommodation))

    const tmpConfirmedMembersOfFamily = { ...confirmedMembersOfFamily }
    filteredGuest.forEach((guest) => {
      tmpConfirmedMembersOfFamily[guest.id] = {
        idFamily,
        confirm: guest.confirm,
        wantsAccommodation: guest.wantsAccommodation,
      }
    })

    setConfirmedMembersOfFamily(tmpConfirmedMembersOfFamily)

    setMembersOfFamily(filteredGuest)
    setConfirmActive(true)
  }

  const addOrRemoveConfirmedGuest = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e.target.checked
    let tmpConfirmedMembersOfFamily = { ...confirmedMembersOfFamily }

    tmpConfirmedMembersOfFamily[id].confirm = checked

    setConfirmedMembersOfFamily(tmpConfirmedMembersOfFamily)
  }

  const addOrRemoveAccomodation = (wantsAccommodation: boolean, id: string) => {
    let tmpConfirmedMembersOfFamily = { ...confirmedMembersOfFamily }

    tmpConfirmedMembersOfFamily[id].wantsAccommodation = wantsAccommodation

    setConfirmedMembersOfFamily(tmpConfirmedMembersOfFamily)
  }

  const confirmAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsAllSelected(checked)

    let tmpConfirmedMembersOfFamily = { ...confirmedMembersOfFamily }

    for (const key in tmpConfirmedMembersOfFamily) {
      tmpConfirmedMembersOfFamily[key].confirm = checked
    }

    setConfirmedMembersOfFamily(tmpConfirmedMembersOfFamily)
  }

  const confirmAllAccommodation = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsAllSelectedWithAccommodation(checked)

    let tmpConfirmedMembersOfFamily = { ...confirmedMembersOfFamily }

    for (const key in tmpConfirmedMembersOfFamily) {
      tmpConfirmedMembersOfFamily[key].wantsAccommodation = checked
    }

    setConfirmedMembersOfFamily(tmpConfirmedMembersOfFamily)
  }

  const renderConfirmForm = () => {
    return (
      <div className="confirm-container">
        <div className="step">
          <div className="box number">1.</div>
          <div className="box title">Busca tu nombre</div>
          <div className="box task">
            <div>
              Busca tu nombre usando el campo de texto y luego da clic en el
              boton <strong>Buscar</strong>
            </div>

            <div className="actions">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="box-shadow"
                type="text"
              />
              <button className="box-shadow" onClick={getConfirm}>
                Buscar
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          renderLoading()
        ) : selectActive ? (
          <div className="step">
            <div className="box number">2.</div>
            <div className="box title">Selecciona tu nombre</div>
            <div className="box task">
              <div>
                Selecciona tu nombre de la lista dando clic al boton{' '}
                <strong>Seleccionar</strong> al lado del nombre que te
                corresponda
              </div>

              <ul>
                {filteredGuest.map((guest) => (
                  <li key={guest.id}>
                    <div className="results box-shadow">
                      <div>{guest.name}</div>
                      <button onClick={() => getFamily(guest.idFamily)}>
                        Seleccionar
                      </button>
                    </div>
                  </li>
                ))}
                {filteredGuest.length == 0 ? (
                  <h3>No se encontraron conincidencias. Intenta de nuevo</h3>
                ) : null}
              </ul>
            </div>
          </div>
        ) : null}
        {confirmActive ? (
          <div className="step">
            <div className="box number">3.</div>
            <div className="box title">Confirma Asistencia</div>
            <div className="box task">
              <div>
                Selecciona las personas de tu nucleo familiar que van a asisitir
                y da clic en el boton <strong>Confirmar</strong>
              </div>
              <ul>
                <li className="all-li">
                  <div className="people box-shadow all">
                    <input
                      type="checkbox"
                      id="all-checked"
                      value="all-checked"
                      checked={isAllSelected}
                      onChange={(e) => confirmAll(e)}
                    />
                    <label htmlFor="all-checked">Confirmar Todos</label>
                  </div>
                  {showAccommodation && isAllSelected ? (
                    <div className="secondary box-shadow accommodation-all">
                      <input
                        type="checkbox"
                        id="all-accommodation"
                        value="all-accommodation"
                        onChange={(e) => confirmAllAccommodation(e)}
                        checked={isAllSelectedWithAccommodation}
                      />
                      <label htmlFor="all-accommodation">
                        Todos con Hospedaje
                      </label>
                    </div>
                  ) : null}
                </li>
                {membersOfFamily.map((guest) => (
                  <li key={guest.id}>
                    <div className="people box-shadow">
                      <input
                        type="checkbox"
                        id={guest.id}
                        value={guest.id}
                        checked={confirmedMembersOfFamily[guest.id].confirm}
                        onChange={(e) => addOrRemoveConfirmedGuest(e, guest.id)}
                      />
                      <label htmlFor={guest.id}>{guest.name}</label>
                    </div>
                    {showAccommodation &&
                    confirmedMembersOfFamily[guest.id].confirm ? (
                      <div className="secondary box-shadow">
                        Hospedaje:
                        <input
                          type="radio"
                          name={`accommodation-${guest.id}`}
                          id={`yes-${guest.id}`}
                          value="yes"
                          checked={
                            confirmedMembersOfFamily[guest.id]
                              .wantsAccommodation
                          }
                          onChange={() =>
                            addOrRemoveAccomodation(true, guest.id)
                          }
                        />
                        <label htmlFor={`yes-${guest.id}`}>Si</label>
                        <input
                          type="radio"
                          name={`accommodation-${guest.id}`}
                          value="no"
                          id={`no-${guest.id}`}
                          checked={
                            !confirmedMembersOfFamily[guest.id]
                              .wantsAccommodation
                          }
                          onChange={() =>
                            addOrRemoveAccomodation(false, guest.id)
                          }
                        />
                        <label htmlFor={`no-${guest.id}`}>No</label>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
              <button className="button-confirm box-shadow">Confirmar</button>
            </div>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className="confirm">
      <h2>Confirmar Asistencia</h2>
      {renderConfirmForm()}
    </div>
  )
}

export default Confirm
