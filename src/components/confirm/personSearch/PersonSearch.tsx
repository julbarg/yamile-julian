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

  useEffect(() => {
    if (inputEl) {
      inputEl.current?.focus()
    }
  }, [])

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
            onSubmit(name)
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="box-shadow"
            type="text"
            ref={inputEl}
          />
          <button className="box-shadow">Buscar</button>
        </form>
      </div>
    </div>
  )
}

export default PersonSearch
