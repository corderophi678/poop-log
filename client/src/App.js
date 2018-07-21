import React, { Fragment, Component } from 'react'
import { Router } from '@reach/router'

import { UserProvider } from 'components/common'

import { Login, Register } from 'components/auth'
import { PupContainer as Pup, Dashboard } from 'components/user'
import { Main } from 'components/main'
import { Navbar } from 'components/nav'

class App extends Component {
  render() {
    return (
      <UserProvider>
        <Fragment>
          <Navbar />
          <Router>
            <Main path="/" />
            <Login path="login" />
            <Register path="register" />
            <Dashboard path="dashboard" />
            <Pup path="pup/:id"/>
          </Router>
        </Fragment>
      </UserProvider>
    )
  }
}

export default App
