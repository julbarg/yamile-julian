import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useState,
} from 'react'
import { ConfirmedGuest, Guest } from '../../../types/Types'

const PersonConfirm: FunctionComponent<{
  people: Guest[]
  showAccommodation: boolean
  // eslint-disable-next-line no-unused-vars
  onSubmit: (confirmedMembersOfFamily: ConfirmedGuest) => {}
}> = ({ people, showAccommodation, onSubmit }) => {
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [
    isAllSelectedWithAccommodation,
    setIsAllSelectedWithAccommodation,
  ] = useState(false)

  const getConfirmedMembersOfFamily: () => ConfirmedGuest = () => {
    const tmpConfirmedMembersOfFamily = {} as ConfirmedGuest

    people.forEach((person) => {
      tmpConfirmedMembersOfFamily[person.id] = {
        idFamily: person.idFamily,
        confirm: person.confirm,
        wantsAccommodation: person.wantsAccommodation,
      }
    })

    return tmpConfirmedMembersOfFamily
  }

  const [confirmedMembersOfFamily, setConfirmedMembersOfFamily] = useState(
    getConfirmedMembersOfFamily()
  )

  useEffect(() => {
    let allSelected = true
    let allAccommodationSelected = true

    for (const key in confirmedMembersOfFamily) {
      if (!confirmedMembersOfFamily[key].confirm) {
        allSelected = false
        break
      }
    }

    for (const key in confirmedMembersOfFamily) {
      if (!confirmedMembersOfFamily[key].wantsAccommodation) {
        allAccommodationSelected = false
        break
      }
    }

    setIsAllSelected(allSelected)
    setIsAllSelectedWithAccommodation(allAccommodationSelected)
  }, [confirmedMembersOfFamily])

  const confirmAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setIsAllSelected(checked)
    let tmpConfirmedMembersOfFamily = { ...confirmedMembersOfFamily }
    for (const key in tmpConfirmedMembersOfFamily) {
      tmpConfirmedMembersOfFamily[key].confirm = checked
      if (!checked) {
        tmpConfirmedMembersOfFamily[key].wantsAccommodation = checked
      }
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

  const addOrRemoveAccomodation = (wantsAccommodation: boolean, id: string) => {
    let tmpConfirmedMembersOfFamily = { ...confirmedMembersOfFamily }
    tmpConfirmedMembersOfFamily[id].wantsAccommodation = wantsAccommodation
    setConfirmedMembersOfFamily(tmpConfirmedMembersOfFamily)
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

  return (
    <div className="step">
      <div className="box number">3.</div>
      <div className="box title">Confirma Asistencia</div>
      <div className="box task">
        <div className="box description">
          Selecciona las personas de tu nucleo familiar que van a asisitir y da
          clic en el boton <strong>Confirmar</strong>
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
              <label htmlFor="all-checked">Confirmar todos</label>
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
                <label htmlFor="all-accommodation">Todos con hospedaje</label>
              </div>
            ) : null}
          </li>
          {people.map((guest) => (
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
                      confirmedMembersOfFamily[guest.id].wantsAccommodation
                    }
                    onChange={() => addOrRemoveAccomodation(true, guest.id)}
                  />
                  <label htmlFor={`yes-${guest.id}`}>Si</label>
                  <input
                    type="radio"
                    name={`accommodation-${guest.id}`}
                    value="no"
                    id={`no-${guest.id}`}
                    checked={
                      !confirmedMembersOfFamily[guest.id].wantsAccommodation
                    }
                    onChange={() => addOrRemoveAccomodation(false, guest.id)}
                  />
                  <label htmlFor={`no-${guest.id}`}>No</label>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
        <button
          className="button-confirm box-shadow"
          onClick={() => onSubmit(confirmedMembersOfFamily)}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}

export default PersonConfirm
