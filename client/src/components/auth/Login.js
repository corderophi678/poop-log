import React, { Component } from 'react'
import { Redirect } from '@reach/router'

import {
  UserContext,
  Layout,
  LabeledInput,
  SubmitButton
} from 'components/common'

export class Login extends Component {
  state = {
    email: '',
    password: ''
  }
  handleInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleFormSubmit = (evt, logUserIn) => {
    evt.preventDefault()
    const { email, password } = this.state
    logUserIn(email, password)
  }
  render() {
    return (
      <UserContext.Consumer>
        {({ isAuthenticated, logUserIn, errors }) => {
          if (isAuthenticated) {
            return <Redirect noThrow to="/dashboard" />
          } else {
            return (
              <Layout>
                <form
                  id="login-form"
                  className="w-100 flex flex-column items-center"
                  onSubmit={evt => this.handleFormSubmit(evt, logUserIn)}>
                  <LabeledInput
                    type="email"
                    value={this.state.email}
                    placeholder="Your@email.com"
                    onChange={this.handleInputChange}
                    name="email"
                    label="Email:"
                    error={errors.email}
                  />
                  <LabeledInput
                    type="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    name="password"
                    label="Password:"
                    error={errors.password}
                  />
                  <div className="mt3 self-center">
                    <SubmitButton label="Login" />
                  </div>
                </form>
              </Layout>
            )
          }
        }}
      </UserContext.Consumer>
    )
  }
}
