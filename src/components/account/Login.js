import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ForgotPassword from './ForgotPassword'
import Loading from '../Loading'

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
    console.log('1')
    event.preventDefault()
    const { email, password } = this.state
    await this.setState({ loading: true })
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/login`, { email, password })
      console.log('2')
      if (res.status === 200) {
        const user = res.data
        user.userID = res.data._id
        // object property "primary" is a boolean indicating if it is the default/main vehicle to display
        const primaryVehicleArray = user.vehicles.filter(car => car.primary)
        if (primaryVehicleArray.length === 0) {
          user.currentlySelectedVehicle = user.vehicles[0] // if none is primary, display the first vehicle by default
        } else {
          user.currentlySelectedVehicle = primaryVehicleArray[0]
        }
        console.log('3')
        await this.setState({ user, password: '', loading: false })
        console.log('4')
        await this.props.updateUserState(this.state.user)
        console.log('5')
        this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+res.status)
        this.setState({loading: false})
        const error = new Error(res.error)
        throw error
      }
    } catch(err) {
        await this.setState({ loading: false })
        console.log(`Error posting to ${process.env.REACT_APP_API_DOMAIN}/api/login`)
        console.dir(err)
        alert('Error logging in please try again')
      }
  }

  render() {
    if (this.state.loading) return <Loading message="Logging in..." /> 

    return (
      <div className="card">
        <h3>Login</h3>
        <form className="padded" onSubmit={this.apiLogin} method="POST">
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
