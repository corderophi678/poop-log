import React, { Component } from 'react'

import {
  SubmitButton,
  SelectGroup,
  Button
} from 'components/common'

export class PoopInputForm extends Component {
  render() {
    const {
      showAddPoop,
      showEditPoop,
      closeAddEditPoop,
      toggleAddPoop,
      toggleEditPoop,
      minuteOptions,
      dateOptions,
      hourOptions,
      monthOptions,
      handleInputChange,
      didPoop,
      date,
      hour,
      minute,
      month,
      notes,
      addPoop,
      editPoop
    } = this.props
    let submitButtonLabel = 'Submit';
    if (showAddPoop && didPoop) {
      submitButtonLabel = 'Add Poop'
    } else if (showAddPoop && !didPoop) {
      submitButtonLabel = 'Add Pee'
    } else if (showEditPoop && didPoop) {
      submitButtonLabel = 'Edit Poop'
    } else if (showEditPoop && !didPoop) {
      submitButtonLabel = 'Edit Pee'
    }
    return (
      <form
        className="w-100"
        id={showAddPoop ? 'add-poop-form' : 'edit-poop-form'}
        onSubmit={showAddPoop ? addPoop : editPoop}>
        <fieldset form={showAddPoop ? 'add-poop-form' : 'edit-poop-form'}>
          <legend>{showAddPoop ? 'Add' : 'Edit'} Poop Time:</legend>
          <div>
            <div className="w-100 flex justify-around">
              <SelectGroup
                onChange={handleInputChange}
                selectLabel="Date:"
                options={dateOptions}
                value={date}
                name="date"
              />
              <SelectGroup
                onChange={handleInputChange}
                selectLabel="Month:"
                options={monthOptions}
                value={month}
                name="month"
              />
            </div>
            <div className="w-100 flex justify-around mv2">
              <SelectGroup
                onChange={handleInputChange}
                selectLabel="Hour:"
                options={hourOptions}
                value={hour}
                name="hour"
              />
              <SelectGroup
                onChange={handleInputChange}
                selectLabel="Minute:"
                options={minuteOptions}
                value={minute}
                name="minute"
              />
            </div>
            <div className="flex flex-row items-center mt3">
              <label htmlFor="didPoop" className="mr2">
                Was there poop?
              </label>
              <input
                id="didPoop"
                name="didPoop"
                type="checkbox"
                checked={didPoop}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-column mt3">
              <label htmlFor="notes">Notes:</label>
              <textarea
                placeholer="This poop was a little soft..."
                className="br2 ba b--black-30 black bg-white pa2 measure"
                name="notes"
                id="notes"
                onChange={handleInputChange}
                value={notes}
              />
            </div>
            <div className="mt3">
              <SubmitButton label={submitButtonLabel} />
              <Button
                type="button"
                onClick={closeAddEditPoop}
                danger
                label="Cancel"
              />
            </div>
          </div>
        </fieldset>
      </form>
    )
  }
}
