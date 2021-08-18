import { Link } from 'react-router-dom'
import React, { FunctionComponent } from 'react'
import './LineMenu.css'
import { LinkRef } from '../../../../types/Types'

const LineMenu: FunctionComponent<{ links: LinkRef[] }> = ({ links }) => {
  return (
    <nav>
      <ul className="ul-nav">
        {links.map((link) => (
          <li key={link.id}>
            <Link className="link-nav" to={link.route}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LineMenu
