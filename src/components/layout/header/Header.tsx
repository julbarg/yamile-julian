import React, { FunctionComponent } from 'react'
import useIsMobile from '../../../hooks/useIsMobile'
import { LinkRef } from '../../../types/Types'
import HamburgerMenu from '../navigation/HamburgerMenu/HamburgerMenu'
import LineMenu from '../navigation/LineMenu/LineMenu'
import { NavHashLink as Link } from 'react-router-hash-link'
import './Header.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { getDaysOfDiferenceBetweenTwoDates } from '../../../util/DateUtil'

const Header: FunctionComponent<{ isMain?: boolean }> = ({ isMain = true }) => {
  const [isMobile] = useIsMobile()
  const [daysLeft, setDaysLeft] = useState(0)

  const links: LinkRef[] = [
    { id: 'home', route: '/', name: 'Inicio' },
    { id: 'confirm', route: '/confirm', name: 'Confirmar asistencia' },
    { id: 'faq', route: '/#faq', name: 'Preguntas frecuentes' },
    { id: 'shcedule', route: '/#shcedule', name: 'Cronograma' },
    { id: 'poll', route: '/#poll', name: 'Encuesta' },
  ]

  useEffect(() => {
    const weddingDate = new Date('12/19/2021')
    setDaysLeft(getDaysOfDiferenceBetweenTwoDates(new Date(), weddingDate))
  }, [])

  const renderNotMain = () => (
    <div className="line-menu-container">
      <Link className="logo" to="/">
        <h1 className="title">Yamile & Julian</h1>
      </Link>
      <LineMenu isMain={isMain} links={links.slice(1)} />
    </div>
  )

  const desktopRender = () => (
    <div className="line-menu-container">
      <LineMenu isMain={isMain} links={links.slice(1, 3)} />
      <Link className="logo" to="/">
        {renderCountDown()}
      </Link>
      <LineMenu isMain={isMain} links={links.slice(3, 5)} />
    </div>
  )

  const mobileVersion = () => (isMain ? renderCountDown() : null)

  const renderCountDown = () => (
    <div className="countdown">
      <div className="countdown-title">Faltan</div>
      <div className="countdown-number">{daysLeft}</div>
      <div className="countdown-days">Dias</div>
    </div>
  )

  const renderHero = () => {
    if (isMain) {
      return (
        <div className="header">
          <h1 className="title">Yamile & Julian</h1>
          <p>19/12/2021 </p>
          <p className="town">Subachoque, Cundinamarca</p>
          <div className="container-button">
            <Link className="logo" to="/confirm/#confirm-page">
              <button>Confirma tu asistencia</button>
            </Link>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <>
      {isMobile ? <HamburgerMenu isMain={isMain} links={links} /> : null}
      <header className={isMain ? '' : 'normal'} id="top">
        {isMobile
          ? mobileVersion()
          : isMain
          ? desktopRender()
          : renderNotMain()}
        {renderHero()}
      </header>
    </>
  )
}

export default Header
