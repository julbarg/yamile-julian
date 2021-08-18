import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { LinkRef } from '../../../../types/Types'
import './HamburgerMenu.css'

const HamburgerMenu: FunctionComponent<{ links: LinkRef[] }> = ({ links }) => {
  return (
    <nav role="navigation">
      <div id="menuToggle">
        <input name="toggle" type="checkbox" />
        <label htmlFor="toggle">
          <span>menu</span>
          <div></div>
          <div></div>
          <div></div>
        </label>
        <ul id="menu">
          {links.map((link) => (
            <li key={link.id}>
              <Link to={link.route}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default HamburgerMenu
