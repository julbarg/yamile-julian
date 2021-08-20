import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import useIsMobile from '../../../hooks/useIsMobile'
import { LinkRef } from '../../../types/Types'
import HamburgerMenu from '../navigation/HamburgerMenu/HamburgerMenu'
import LineMenu from '../navigation/LineMenu/LineMenu'
import './Header.scss'

const Header: FunctionComponent<{ isMain?: boolean }> = ({ isMain = true }) => {
  const [isMobile] = useIsMobile()

  const links: LinkRef[] = [
    { id: 'home', route: '/', name: 'Inicio' },
    { id: 'confirm', route: '/confirm', name: 'Confirmar Asistencia' },
    { id: 'faq', route: '/#faq', name: 'Preguntas Frecuentes' },
    { id: 'shcedule', route: '/#shcedule', name: 'Cronograma' },
    { id: 'story', route: '/story', name: 'Historia' },
  ]

  const renderNotMain = () => (
    <div className="line-menu-container">
      <Link className="logo" to="/">
        <h1 className="title">Yamile & Julian</h1>
      </Link>
      <LineMenu isMain={isMain} links={links} />
    </div>
  )

  const desktopRender = () => (
    <div className="line-menu-container">
      <LineMenu isMain={isMain} links={links.slice(1, 3)} />
      <Link className="logo" to="/">
        <h1 className="title">Yamile & Julian</h1>
      </Link>
      <LineMenu isMain={isMain} links={links.slice(3, 5)} />
    </div>
  )

  const mobileVersion = () => (
    <div>
      <HamburgerMenu isMain={isMain} links={links} />
      <h1 className="title">Yamile & Julian</h1>
    </div>
  )

  const renderHero = () => {
    if (isMain) {
      return (
        <div className="hero">
          <p>19/12/2021 </p>
          <p className="town">Subachoque, Cundinamarca</p>
          <div className="container-button">
            <button>Confirma tu Asistencia</button>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <header className={isMain ? '' : 'normal'}>
      {isMobile ? mobileVersion() : isMain ? desktopRender() : renderNotMain()}
      {renderHero()}
    </header>
  )
}

export default Header
