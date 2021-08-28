import React, {
  useEffect,
  useState,
  MutableRefObject,
  FunctionComponent,
  useContext,
} from 'react'
import { useRef } from 'react'
import { DBContext } from '../../App'
import Loading from '../loading/Loading'
import './Message.scss'

const Message: FunctionComponent = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [readyToSend, setReadyToSend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const inputEl: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const db = useContext(DBContext)

  useEffect(() => {
    if (inputEl) {
      inputEl.current?.focus()
    }
  }, [])

  useEffect(() => {
    setReadyToSend(name.length > 3 && message.length > 2)
  }, [name, message])

  const onSubmit = async () => {
    setLoading(true)
    db.collection('message')
      .add({
        name,
        message,
      })
      .then(() => {
        setLoading(false)
        setShowResult(true)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  }

  const reset = () => {
    setLoading(false)
    setName('')
    setMessage('')
    setShowResult(false)
    if (inputEl) {
      inputEl.current?.focus()
    }
  }

  const renderResult = () => (
    <div className="result">
      <h3>Gracias por tu mensaje.</h3>
      <button className="button-reset box-shadow" onClick={reset}>
        Enviar otro mensaje
      </button>
    </div>
  )

  const renderForm = () => (
    <div className="message-container">
      <p>
        Te invitamos a contagiarnos de amor y buena energía con un mensaje en
        nuestro libro de firmas.¡Gracias por alimentarnos el corazón!
      </p>
      <form
        className="actions"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
      >
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          className="box-shadow"
          type="text"
          ref={inputEl}
          minLength={3}
        />
        <label htmlFor="message">Mensaje</label>
        <textarea
          className="box-shadow"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={10}
        ></textarea>
        <button className="box-shadow" disabled={!readyToSend}>
          Enviar
        </button>
      </form>
    </div>
  )

  return (
    <div className="message">
      <h2>¿Quieres dejarnos un mensaje?</h2>
      {loading ? <Loading /> : showResult ? renderResult() : renderForm()}
    </div>
  )
}

export default Message
