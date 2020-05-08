import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ForgotPassword from './ForgotPassword'
import Loading from '../Loading'

import { getLogData } from '../../helpers'
import '../../styles/login.css'

const axios = require('axios')
// axios.defaults.withCredentials = true

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: props.user || {
        userID: '',
        username: '',
        sessionID: '',
        cookies: '',
        log: [],
        currentlySelectedVehicle: {}
      },
      loading: false
    }
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiLogin = async event => {
    event.preventDefault()
    const { email, password } = this.state
    await this.setState({ loading: true })
    try {
      // /login success returns a User object containing any Vehicle's registered by that User
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/login`, { email, password })
      if (res.status === 200) {
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const name = user.name
        const logData = await getLogData()
        const vehicle = logData.vehicle || []
        const log = logData.log || []
        // object property "primary" is a boolean indicating if it is the default/main vehicle to display
        const primaryVehicleArray = vehicle.filter(car => car.primary)
        let currentlySelectedVehicle
        if (primaryVehicleArray.length === 0) {
          currentlySelectedVehicle = vehicle[0] // if none is primary, display the first vehicle by default
        } else {
          currentlySelectedVehicle = primaryVehicleArray[0]
        }
        await this.setState({ user: { name, userID, sessionID, cookies, email, vehicle, log, currentlySelectedVehicle }, password: '', loading: false })
        await this.props.updateUserState(this.state.user)
        this.props.history.push('/')
      } else {
        // console.log('Response received but with status code: '+res.status)
        this.setState({loading: false})
        const error = new Error(res.error)
        throw error
      }
    } catch(err) {
        this.setState({loading: false})
        console.log(`Error posting to ${process.env.REACT_APP_API_DOMAIN}/api/login`)
        console.dir(err)
        alert('Error logging in please try again')
      }
  }

  render() {
    if (this.state.loading) return <Loading message="Logging in..." /> 

    return (
      <div className="card">
        <form onSubmit={this.apiLogin} method="POST">
          <h2>Login</h2>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Log In →" />
        </form>

        <ForgotPassword email={this.state.email || ''} /> 
      </div>
    )
  }
}

Login.propTypes = {
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicle: PropTypes.array,
    currentlySelectedVehicle: PropTypes.object
  }),
  updateUserState: PropTypes.func.isRequired
}

export default Login
