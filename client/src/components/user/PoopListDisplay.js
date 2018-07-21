import React from 'react'
import moment from 'moment'

import { UserContext, Button } from 'components/common'

export function PoopListDisplay(props) {
  const { poops, toggleShowEditPoop } = props
  return (
    <UserContext.Consumer>
      {({ deletePoop }) => {
        return (
          <div className="flex flex-column w-third-ns w-100 justify-center items-center mt3">
            {poops &&
              poops.map(poop => (
                <div
                  key={poop._id}
                  className="w-100 f5 fw5 lh-copy flex flex-row justify-center items-center">
                  <div className="w-two-thirds-ns">
                    <p className="dib">
                      {poop.didPoop ? 'Poo @ ' : 'Pee @ '}{' '}
                      {moment(poop.time).format('h:mm a, MMM Do')}
                    </p>
                  </div>
                  <div className="w-third-ns flex flex-row justify-around">
                    <Button
                      onClick={() => toggleShowEditPoop(poop)}
                      type="button"
                      label="Edit"
                      primary
                    />
                    <Button
                      onClick={() => deletePoop(poop._id, poop.pup)}
                      type="button"
                      label="Delete"
                      danger
                    />
                  </div>
                </div>
              ))}
          </div>
        )
      }}
    </UserContext.Consumer>
  )
}
