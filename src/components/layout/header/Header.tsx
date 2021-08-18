import useIsMobile from '../../../hooks/useIsMobile'
import { LinkRef } from '../../../types/Types'
import HamburgerMenu from '../navigation/HamburgerMenu/HamburgerMenu'
import LineMenu from '../navigation/LineMenu/LineMenu'
import './Header.scss'

const Header = () => {
  const [isMobile] = useIsMobile()

  const links: LinkRef[] = [
    { id: 'confirm', route: '/', name: 'Confirmar Asistencia' },
    { id: 'faq', route: '/', name: 'Preguntas Frecuentes' },
    { id: 'shcedule', route: '/', name: 'Cronograma' },
    { id: 'story', route: '/', name: 'Historia' },
  ]

  const desktopRender = () => (
    <div className="line-menu">
      <LineMenu links={links.slice(0, 2)} />
      <h1 className="title">Yamile & Julian</h1>
      <LineMenu links={links.slice(2, 4)} />
    </div>
  )

  const mobileVersion = () => (
    <div>
      <HamburgerMenu links={links} />
      <h1 className="title">Yamile & Julian</h1>
    </div>
  )

  return (
    <header>
      {isMobile ? mobileVersion() : desktopRender()}
      <div className="hero">
        <p>19/12/2021 </p>
        <p className="town">Subachoque, Cundinamarca</p>
        <div className="container-button">
          <button>Confirma tu Asistencia</button>
        </div>
      </div>
    </header>
  )
}

export default Header
