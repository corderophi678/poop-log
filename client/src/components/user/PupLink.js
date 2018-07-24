import React, { Component } from 'react'
import { Link } from '@reach/router'
import moment from 'moment'

import { Button, UserContext } from 'components/common'

export class PupLink extends Component {
  addItem = (didPoop, fn) => {
    const { id } = this.props
    const time = Date.now()
    const notes = ''
    fn(didPoop, id, time, notes)
  }
  render() {
    const { id, name } = this.props
    return (
      <UserContext.Consumer>
        {({ poops, addPoop, isLoading }) => {
          const lastPoop =
            poops && poops[id] && poops[id].length > 0
              ? poops[id].find(el => el.didPoop)
              : null
          return (
            <div className="mw6 center pa2 flex justify-between bb b--black-30">
              <div className="flex flex-column">
                <Link to={`/pup/${id}`} className="link f4 fw6 lh-copy">
                  {name}
                </Link>
                {lastPoop ? (
                  <span className="f6 fw5 lh-copy mt2">
                    Last Poop: {moment(lastPoop.time).format('h:mm a, MMM Do')}
                  </span>
                ) : isLoading ? (
                  <h1>Loading...</h1>
                ) : null}
              </div>
              <div className="flex flex-column justify-around">
                <Button
                  onClick={() => this.addItem(true, addPoop)}
                  type="button"
                  label="Add Poo"
                  primary
                  classes={['mb2']}
                />
                <Button
                  onClick={() => this.addItem(false, addPoop)}
                  type="button"
                  label="Add Pee"
                />
              </div>
            </div>
          )
        }}
      </UserContext.Consumer>
    )
  }
}
