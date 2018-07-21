import React, { Component } from 'react'
import { Redirect } from '@reach/router'

import {
  UserContext,
} from 'components/common'

import { DashboardData } from 'components/user'

export class Dashboard extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {({
          isAuthenticated,
          isLoading,
          addPup,
          getPupsData,
          getPupData,
          pups,
          errors
        }) => {
          if (!isAuthenticated) {
            return <Redirect noThrow to="/login" />
          } else {
            return (
              <DashboardData
                getPupData={getPupData}
                isLoading={isLoading}
                addPup={addPup}
                getPupsData={getPupsData}
                pups={pups}
                errors={errors}
              />
            )
          }
        }}
      </UserContext.Consumer>
    )
  }
}
