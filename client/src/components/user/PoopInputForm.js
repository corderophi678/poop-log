import React, { Component } from 'react'

import {
  UserContext,
  SubmitButton,
  SelectGroup,
  Button
} from 'components/common'

export class PoopInputForm extends Component {
  render() {
    const {
      showAddPoop,
      toggleAddPoop,
      showEditPoop,
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
                name="notes"
                id="notes"
                onChange={handleInputChange}
                value={notes}
              />
            </div>
            <div className="mt3">
              <SubmitButton label={showAddPoop ? 'Add Poop' : 'Edit Poop'} />
              <Button
                type="button"
                onClick={showAddPoop ? toggleAddPoop : toggleEditPoop}
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
