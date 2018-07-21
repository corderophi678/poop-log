import React, { Component } from 'react'
import { Redirect } from '@reach/router'

import {
  UserContext,
  Layout,
  LabeledInput,
  SubmitButton
} from 'components/common'

export class Register extends Component {
  state = {
    email: '',
    password: '',
    password2: ''
  }
  handleInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleFormSubmit = (evt, registerUser) => {
    evt.preventDefault()
    const { email, password, password2 } = this.state
    registerUser(email, password, password2)
  }
  render() {
    return (
      <UserContext.Consumer>
        {({ isAuthenticated, registerUser, errors }) => {
          if (isAuthenticated) {
            return <Redirect noThrow to="/dashboard" />
          } else {
            return (
              <Layout>
                <form
                  id="register-form"
                  className="flex flex-column"
                  onSubmit={evt => this.handleFormSubmit(evt, registerUser)}>
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
                  <LabeledInput
                    type="password"
                    value={this.state.password2}
                    onChange={this.handleInputChange}
                    name="password2"
                    label="Confirm Password:"
                    error={errors.password2}
                  />
                  <div className="mt3 self-center">
                    <SubmitButton label="Register" />
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
