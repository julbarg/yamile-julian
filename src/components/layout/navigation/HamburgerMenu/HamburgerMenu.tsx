import React, { FunctionComponent, MutableRefObject, useRef } from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import { LinkRef } from '../../../../types/Types'
import './HamburgerMenu.scss'

const HamburgerMenu: FunctionComponent<{
  links: LinkRef[]
  isMain: boolean
}> = ({ links, isMain = true }) => {
  const toggleCheckbox: MutableRefObject<HTMLInputElement | null> = useRef(null)

  const checkToggle = () => {
    if (toggleCheckbox && toggleCheckbox.current) {
      toggleCheckbox.current.checked = false
    }
  }

  const scrollWithOffset = (el) => {
    setTimeout(() => {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
      const yOffset = 0
      window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
    }, 500)
  }

  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input name="toggle" type="checkbox" ref={toggleCheckbox} />
        <label className={isMain ? '' : 'normal'} htmlFor="toggle">
          <span>menu</span>
          <div></div>
          <div></div>
          <div></div>
        </label>
        <ul id="menu">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                to={link.route}
                activeClassName="active"
                smooth={true}
                exact
                onClick={checkToggle}
                scroll={(el) => scrollWithOffset(el)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default HamburgerMenu
