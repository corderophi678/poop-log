import React from 'react'
import moment from 'moment'

import { UserContext, Button } from 'components/common'

export function PoopListDisplay(props) {
  const { poops, toggleShowEditPoop } = props
  return (
    <UserContext.Consumer>
      {({ deletePoop }) => {
        return (
          <div className="flex flex-column w-50-ns w-100 justify-center items-center mt3">
            {poops &&
              poops.map(poop => (
                <div
                  key={poop._id}
                  className="w-100 f5 fw5 lh-copy flex flex-row justify-center items-center bb bw1 b-black-80">
                  <div className="w-two-thirds">
                    <p className="dib">
                      {poop.didPoop ? 'Poo @ ' : 'Pee @ '}{' '}
                      {moment(poop.time).format('h:mm a, MMM Do')}
                      <br />
                      {poop.notes ? (
                        <small className="measure">
                          <span className="b mr2">Notes:</span>
                          {poop.notes}
                        </small>
                      ) : null}
                    </p>
                  </div>
                  <div className="w-third flex flex-row mh3  justify-around">
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
