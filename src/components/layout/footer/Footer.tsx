import React from 'react'
import './Footer.scss'
import LinkedIn from '@material-ui/icons/LinkedIn'

const Footer = () => {
  return (
    <footer>
      <div>Diseñado por Julian Barragan</div>
      <a
        href="https://www.linkedin.com/in/julian-barragan-b8844ab6/"
        target="_blank"
        rel="noreferrer"
      >
        <LinkedIn />
      </a>
    </footer>
  )
}

export default Footer
