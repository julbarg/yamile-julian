import React, { FunctionComponent } from 'react'
import './LineMenu.scss'
import { LinkRef } from '../../../../types/Types'
import { NavHashLink as Link } from 'react-router-hash-link'

const LineMenu: FunctionComponent<{ links: LinkRef[]; isMain: boolean }> = ({
  links,
}) => {
  const scrollWithOffset = (el: HTMLElement) => {
    setTimeout(() => {
      const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
      const yOffset = 0
      window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' })
    }, 500)
  }

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
              scroll={(el) => scrollWithOffset(el)}
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
