import React, { FunctionComponent } from 'react'
import './LineMenu.scss'
import { LinkRef } from '../../../../types/Types'
import { NavHashLink as Link } from 'react-router-hash-link'

const LineMenu: FunctionComponent<{ links: LinkRef[] }> = ({ links }) => {
  return (
    <nav className="line-menu">
      <ul className="ul-nav">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className="link-nav"
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
    </nav>
  )
}

export default LineMenu
