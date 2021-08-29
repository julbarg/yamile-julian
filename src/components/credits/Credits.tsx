import React from 'react'
import './Credits.scss'

const Credits = () => {
  return (
    <div className="credits">
      <div className="credits-container">
        <div className="credit">
          <div className="credit-name">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/yamile-julian.appspot.com/o/yamile-julian%2Fimage%2Flovely-logo.png?alt=media&token=5157f9c7-01be-4030-a5bf-c226fc0ce7b2"
              alt="Logo Credit"
            />
          </div>
          <div className="credit-content">
            <a
              href="https://www.instagram.com/_u/lovelyweddingsbodas/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <button className="button-instagram">
                <span>@lovelyweddingsbodas</span>
              </button>
            </a>
          </div>
        </div>
        <div className="credit">
          <div className="credit-name">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/yamile-julian.appspot.com/o/yamile-julian%2Fimage%2Frocha.jpeg?alt=media&token=68216e8d-42b3-4720-943b-e6c20f9d953c"
              alt="Logo Credit"
            />
          </div>
          <div className="credit-content">
            <a
              href="https://www.instagram.com/_u/rochafotografia/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <button className="button-instagram">
                <span>@rochafotografia</span>
              </button>
            </a>
          </div>
        </div>
        <div className="credit last">
          <div className="credit-name">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/yamile-julian.appspot.com/o/yamile-julian%2Fimage%2Fpia.jpeg?alt=media&token=7f12d4eb-0ee0-436e-9e1b-a81e5cd072f5"
              alt="Logo Credit"
            />
          </div>
          <div className="credit-content">
            <a
              href="https://www.instagram.com/_u/bodasbogota/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <button className="button-instagram">
                <span>@bodasbogota</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credits
