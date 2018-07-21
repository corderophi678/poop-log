import React, { Component, Fragment } from 'react'
import { Link, Location } from '@reach/router'

import { UserContext } from 'components/common'

export class NavLinks extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ isAuthenticated, logUserOut }) => {
          return isAuthenticated ? (
            <Fragment>
              <Link className="link dim white dib" to="/dashboard">
                Dashboard
              </Link>
              <button
                onClick={logUserOut}
                className="bg-transparent link grow br-pill ba bw2 ph3 pv2 mh2 dib yellow b--yellow pointer f6 fw6">
                Log Out
              </button>
            </Fragment>
          ) : (
            <Location>
              {({ location }) => {
                return (
                  <Fragment>
                    <Link
                      className={`link dim white dib ${
                        location.pathname === '/' ? 'underline' : ''
                      }`}
                      to="/">
                      Home
                    </Link>
                    <Link
                      className={`link dim white dib ${
                        location.pathname === '/login' ? 'underline' : ''
                      }`}
                      to="login">
                      Log In
                    </Link>
                    <Link
                      className={`link dim white dib ${
                        location.pathname === '/register' ? 'underline' : ''
                      }`}
                      to="register">
                      Register
                    </Link>
                  </Fragment>
                )
              }}
            </Location>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
