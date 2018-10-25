import React, { Component, Fragment } from 'react'

import { Layout, LabeledInput, Button, SubmitButton } from 'components/common'
import { PupLink } from 'components/user'

const Spinner = () => <p>Loading...</p>

export class DashboardData extends Component {
  state = {
    name: '',
    showAddPup: false
  }
  toggleShowAddPup = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showAddPup: !prevState.showAddPup
      }
    })
  }
  handleInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleAddPup = (evt, addPup) => {
    evt.preventDefault()
    addPup(this.state.name)
    this.setState({
      name: '',
      showAddPup: false
    })
  }
  componentDidMount() {
    this.props.getPupsData()
  }
  render() {
    const { addPup, isLoading, pups, errors, getPupData, deleteUserAccount } = this.props
    return (
      <Layout>
        <h1>Welcome to your dashboard.</h1>
        <p>
          Here you can add and edit your pups. Click on a pup's name to go to
          their details page.
        </p>
        <div className="w-100">
          {pups && pups.length > 0 ? (
            pups.map(pup => (
              <PupLink
                key={pup._id}
                id={pup._id}
                name={pup.name}
                getPupData={getPupData}
              />
            ))
          ) : isLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              <p>You haven't added any pups yet. Click below to add one.</p>
            </Fragment>
          )}
        </div>
        <div className="mt3">
          {!this.state.showAddPup ? (
            <Button
              type="button"
              onClick={this.toggleShowAddPup}
              label="Add a Pup"
              primary
            />
          ) : (
            <form
              id="add-pup-form"
              onSubmit={evt => this.handleAddPup(evt, addPup)}>
              <LabeledInput
                type="text"
                placeholder="Gato"
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                label="Pup's Name:"
                error={errors.name}
              />
              <div className="mt3">
                <SubmitButton label="Add Pup" />
                <Button
                  onClick={this.toggleShowAddPup}
                  danger
                  type="button"
                  label="Cancel"
                />
              </div>
            </form>
          )}
        </div>
      <div className="mt3">
        <Button
          onClick={deleteUserAccount}
          danger
          type="button"
          label="Delete Account"
        />
      </div>
      </Layout>
    )
  }
}
