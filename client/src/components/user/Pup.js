import React, { Fragment, Component } from 'react'
import moment from 'moment'

import { UserContext, Button, Layout } from 'components/common'
import { PoopListDisplay, PoopInputForm } from 'components/user'

export class Pup extends Component {
  state = {
    date: '',
    month: '',
    hour: '',
    minute: '',
    didPoop: true,
    editPoopId: '',
    notes: '',
    showAddPoop: false,
    showEditPoop: false
  }
  toggleShowAddPoop = () => {
    this.setState(prevState => {
      return {
        showAddPoop: !prevState.showAddPoop
      }
    })
  }
  toggleShowEditPoop = poop => {
    if (poop) {
      const { time, id, notes } = poop
      const t = new Date(time)
      const m = t.getMonth()
      const h = t.getHours()
      const d = t.getDate()
      const min = t.getMinutes()
      this.setState(prevState => {
        return {
          ...prevState,
          editPoopId: id,
          hour: h,
          minute: min,
          date: d,
          month: m,
          notes,
          showEditPoop: !prevState.showEditPoop
        }
      })
    } else {
      this.setState(prevState => ({
        ...prevState,
        showEditPoop: !prevState.showEditPoop
      }))
    }
  }
  resetPoopData = () => {
    const now = new Date()
    const m = now.getMonth()
    const h = now.getHours()
    const d = now.getDate()
    const min = now.getMinutes()
    this.setState(prevState => {
      return {
        ...prevState,
        hour: h,
        minute: min,
        date: d,
        month: m,
        editPoopId: '',
        notes: ''
      }
    })
  }
  addPoop = (evt, fn) => {
    if (evt) evt.preventDefault()
    const { pupId } = this.props
    const { didPoop, month, date, hour, minute, notes } = this.state
    const t = new Date()
    t.setMonth(month)
    t.setDate(date)
    t.setHours(hour)
    t.setMinutes(minute)
    const time = Date.parse(t)
    fn(didPoop, pupId, time, notes)
    this.resetPoopData()
    if (this.state.showAddPoop) this.toggleShowAddPoop()
  }
  editPoop = (evt, fn) => {
    evt.preventDefault()
    const { pupId } = this.props
    const { didPoop, month, date, hour, minute, notes, editPoopId } = this.state
    const t = new Date()
    t.setMonth(month)
    t.setDate(date)
    t.setHours(hour)
    t.setMinutes(minute)
    const time = Date.parse(t)
    fn(pupId, editPoopId, didPoop, time, notes)
    this.resetPoopData()
    if (this.state.showEditPoop) this.toggleShowEditPoop()
  }
  handleInputChange = evt => {
    evt.persist()
    const target = evt.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }
  getDaysInMonth = () => {
    let now = this.state.month ? moment().month(this.state.month) : moment()
    return now.daysInMonth()
  }
  getMonth = index => {
    switch (index) {
      case 0:
        return 'January'
      case 1:
        return 'February'
      case 2:
        return 'March'
      case 3:
        return 'April'
      case 4:
        return 'May'
      case 5:
        return 'June'
      case 6:
        return 'July'
      case 7:
        return 'August'
      case 8:
        return 'September'
      case 9:
        return 'October'
      case 10:
        return 'November'
      case 11:
        return 'December'
      default:
        return false
    }
  }
  componentDidMount() {
    this.resetPoopData()
  }
  render() {
    const minuteOptions = new Array(60)
      .fill(0)
      .map((min, idx) => ({ label: idx, value: idx }))
    const hourOptions = new Array(24)
      .fill(0)
      .map((min, idx) => ({ label: idx, value: idx }))
    const dateOptions = new Array(this.getDaysInMonth())
      .fill(0)
      .map((min, idx) => ({ label: idx + 1, value: idx + 1 }))
    const monthOptions = new Array(12)
      .fill(0)
      .map((min, idx) => ({ label: this.getMonth(idx), value: idx }))
    if (this.props.isLoading) {
      return (
        <Layout>
          <h1>Loading...</h1>
        </Layout>
      )
    } else {
      const { pup = { name: 'Your' }, poops } = this.props
      return (
        <UserContext.Consumer>
          {({ addPoop, editPoop, deletePup }) => {
            return (
              <Layout>
                <div className="mt2">
                  <h1 className="dib f3">{pup.name}'s Poop Log</h1>
                  <Button
                    type="button"
                    onClick={() => deletePup(this.props.pupId)}
                    label="Delete"
                    danger
                  />
                </div>
                <div className="flex flex-column w-50-ns w-100 justify-center items-center">
                  {this.state.showAddPoop || this.state.showEditPoop ? (
                    <PoopInputForm
                      showAddPoop={this.state.showAddPoop}
                      showEditPoop={this.state.showEditPoop}
                      toggleAddPoop={this.toggleShowAddPoop}
                      toggleEditPoop={this.toggleShowEditPoop}
                      pupId={this.props.pupId}
                      minuteOptions={minuteOptions}
                      hourOptions={hourOptions}
                      monthOptions={monthOptions}
                      dateOptions={dateOptions}
                      handleInputChange={this.handleInputChange}
                      date={this.state.date}
                      month={this.state.month}
                      hour={this.state.hour}
                      minute={this.state.minute}
                      notes={this.state.notes}
                      didPoop={this.state.didPoop}
                      addPoop={evt => this.addPoop(evt, addPoop)}
                      editPoop={evt => this.editPoop(evt, editPoop)}
                    />
                  ) : (
                    <div className="flex flex-row justify-around">
                      <Button
                        onClick={() => {
                          this.addPoop(false, addPoop)
                        }}
                        label="Add Poop"
                        type="button"
                        primary
                      />
                      <Button
                        onClick={this.toggleShowAddPoop}
                        type="button"
                        label="Add Manually"
                      />
                    </div>
                  )}
                </div>
                <PoopListDisplay
                  toggleShowEditPoop={this.toggleShowEditPoop}
                  poops={poops}
                />
              </Layout>
            )
          }}
        </UserContext.Consumer>
      )
    }
  }
}
