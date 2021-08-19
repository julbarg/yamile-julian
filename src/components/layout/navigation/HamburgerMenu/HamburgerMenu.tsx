import React, { FunctionComponent } from 'react'
import { NavHashLink as Link } from 'react-router-hash-link'
import { LinkRef } from '../../../../types/Types'
import './HamburgerMenu.scss'

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
              <Link
                to={link.route}
                activeClassName="active"
                smooth={true}
                exact
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
