import React, { Component } from 'react'

import { UserContext } from 'components/common'

import { NavLinks } from 'components/nav/NavLinks'

export class Navbar extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ isAuthenticated }) => {
          return (
            <header className="bg-navy fixed z-1 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
              <nav
                className={`mw9-ns mw6 center f6 fw6 ttu tracked flex flex-row items-baseline ${
                  isAuthenticated ? 'justify-between' : 'justify-around'
                }`}>
                <NavLinks isAuthenticated={isAuthenticated} />
              </nav>
            </header>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
