import React, {
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react'

const PersonSearch: FunctionComponent<{
  // eslint-disable-next-line no-unused-vars
  onSubmit: (name: string) => void
}> = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const inputEl: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const [showNameInputMessage, setShowNameInputMessage] = useState(true)

  useEffect(() => {
    if (inputEl) {
      inputEl.current?.focus()
    }
  }, [])

  // eslint-disable-next-line no-unused-vars
  const isLengthValid: (txt: string) => boolean = (txt) => txt.length >= 3

  return (
    <div className="step">
      <div className="box number">{'1.'}</div>
      <div className="box title">Busca tu nombre</div>
      <div className="box task">
        <div>
          Busca tu nombre usando el campo de texto y luego da clic en el boton{' '}
          <strong>Buscar</strong>
        </div>
        <form
          className="actions"
          onSubmit={(e) => {
            e.preventDefault()
            if (isLengthValid(name)) {
              onSubmit(name)
            }
          }}
        >
          <input
            value={name}
            onChange={(e) => {
              setShowNameInputMessage(!isLengthValid(e.target.value))
              setName(e.target.value)
            }}
            className="box-shadow"
            type="text"
            ref={inputEl}
            minLength={3}
          />
          <button className="box-shadow" disabled={showNameInputMessage}>
            Buscar
          </button>
          <span
            className={`input-message ${!showNameInputMessage ? 'valid' : ''}`}
          >
            {showNameInputMessage ? 'Al menos 3 caracteres' : 'Valido'}
          </span>
        </form>
      </div>
    </div>
  )
}

export default PersonSearch
