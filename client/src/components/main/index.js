import React, { Component } from 'react'
import { Link, Redirect } from '@reach/router'

import { UserContext, Layout } from 'components/common'

export class Main extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ isAuthenticated }) => {
          if (isAuthenticated) {
            return <Redirect noThrow to="/dashboard" />
          } else {
            return (
              <Layout>
                <h1>Welcome to the Poop Log</h1>
                <p>
                  Click below (or above) to log in or register a new account
                </p>
                <Link to="register">Register</Link>
                <br />
                <Link to="login">Log In</Link>
              </Layout>
            )
          }
        }}
      </UserContext.Consumer>
    )
  }
}
