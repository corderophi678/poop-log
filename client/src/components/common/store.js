import React, { createContext, Component } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { navigate } from '@reach/router'

import { setAuthToken } from 'utils/setAuthToken'
import { isEmpty } from 'utils/isEmpty'

export const UserContext = createContext()

export class UserProvider extends Component {
  state = {
    isAuthenticated: false,
    isLoading: false,
    errors: {},
    user: {},
    pups: [],
    poops: {}
  }
  // Handle errors
  _setErrors = errData => {
    this.setState(prevState => {
      return {
        ...prevState,
        errors: errData
      }
    })
  }
  // Loading and User States
  _setLoading = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isLoading: true
      }
    })
  }
  _unsetLoading = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isLoading: false
      }
    })
  }
  _setCurrentUser = userData => {
    this.setState(prevState => {
      return {
        ...prevState,
        isAuthenticated: !isEmpty(userData),
        user: userData
      }
    })
  }
  // Authentication
  logUserIn = (email, password) => {
    this._setLoading()
    axios
      .post('/api/users/login', { email, password })
      .then(res => {
        const { token } = res.data
        localStorage.setItem('poop-log::token', token)
        setAuthToken(token)
        const decoded = jwtDecode(token)
        this._setCurrentUser(decoded)
      })
      .catch(err => this._setErrors(err.response.data))
    this._unsetLoading()
  }
  logUserOut = () => {
    localStorage.removeItem('poop-log::token')
    setAuthToken(false)
    this._setCurrentUser({})
  }
  registerUser = (email, password, password2) => {
    this._setLoading()
    axios
      .post('/api/users/register', { email, password, password2 })
      .then(res => navigate('/login'))
      .catch(err => this._setErrors(err.response.data))
    this._unsetLoading()
  }
  // Pup Stuff
  addPup = name => {
    axios
      .post('/api/pups/create', { name })
      .then(res => this.getPupsData())
      .catch(err => this._setErrors(err.response.data))
  }
  getPupsData = () => {
    this._setLoading()
    axios
      .get('/api/pups')
      .then(
        res => {
          this.setState(prevState => {
            return {
              ...prevState,
              pups: res.data
            }
          })
        },
        err =>
          this.setState(prevState => {
            return {
              ...prevState,
              pups: null
            }
          })
      )
      .then(res => this._unsetLoading())
  }
  getPupData = pupId => {
    this._setLoading()
    axios
      .get(`/api/pups/${pupId}`)
      .then(
        res => {
          this.setState(prevState => {
            return {
              ...prevState,
              poops: {
                ...prevState.poops,
                [pupId]: res.data
              }
            }
          })
        },
        err => {
          console.log(err.response.data)
        }
      )
      .then(res => {
        if (Object.keys(this.state.poops).length === this.state.pups.length) {
          this._unsetLoading()
        }
      })
  }
  editPup = () => {}
  deletePup = pupId => {
    if (window.confirm('Are you sure? This cannot be undone')) {
      axios
        .delete(`/api/pups/${pupId}`)
        .then(res => {
          this.getPupsData()
          navigate('/dashboard')
        })
        .catch(e => this._setErrors(e.response.data))
    }
  }
  // Poop Stuff
  addPoop = (didPoop, pupId, time, notes) => {
    axios
      .post('/api/poops/create', { didPoop, pupId, time, notes })
      .then(res => this.getPupData(pupId))
      .catch(e => this._setErrors(e.response.data))
  }
  editPoop = (pupId, id, didPoop, time, notes) => {
    axios
      .post(`/api/poops/edit/${id}`, { didPoop, time, notes })
      .then(res => this.getPupData(pupId))
      .catch(e => this._setErrors(e.response.data))
  }
  deletePoop = (poopId, pupId) => {
    if (window.confirm('Are you sure? This cannot be undone')) {
      axios
        .delete(`/api/poops/${poopId}`)
        .then(res => {
          this.getPupData(pupId)
        })
        .catch(err => this._setErrors(err.response.data))
    }
  }
  // Lifecylce methods
  async componentDidMount() {
    const token = await localStorage.getItem('poop-log::token')
    if (token) {
      setAuthToken(token)
      const decoded = jwtDecode(token)
      this._setCurrentUser(decoded)
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        this.logUserOut()
        navigate('login')
      } else {
        this.getPupsData()
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let currLen = Object.keys(this.state.pups).length
    let prevLen = Object.keys(prevState.pups).length
    if (prevLen !== currLen) {
      for (let pup in this.state.pups) {
        this.getPupData(this.state.pups[pup]._id)
      }
    }
  }
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          logUserIn: this.logUserIn,
          logUserOut: this.logUserOut,
          registerUser: this.registerUser,
          addPup: this.addPup,
          getPupsData: this.getPupsData,
          getPupData: this.getPupData,
          editPup: this.editPup,
          deletePup: this.deletePup,
          addPoop: this.addPoop,
          editPoop: this.editPoop,
          deletePoop: this.deletePoop
        }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
