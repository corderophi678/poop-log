import React, { Component } from 'react'
import { Redirect } from '@reach/router'

import { UserContext } from 'components/common'
import { Pup } from 'components/user'

export class PupContainer extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({ getPupData, isLoading, pups, poops, isAuthenticated }) => {
          if (!isAuthenticated) {
            return <Redirect noThrow to="/login" />
          }
          const thesePoops = poops ? poops[this.props.id] : null
          const thisPup = pups
            ? pups.find(pup => pup._id === this.props.id)
            : null
          return (
            <Pup
              getPupData={getPupData}
              pupId={this.props.id}
              isLoading={isLoading}
              pup={thisPup}
              poops={thesePoops}
            />
          )
        }}
      </UserContext.Consumer>
    )
  }
}
