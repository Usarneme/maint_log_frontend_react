import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ForgotPassword from './ForgotPassword'
import { getLogData } from '../../helpers'
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
        cookies: ''
      },
      loading: false,
      showForgotPassword: false
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
    this.setState(prevState => ({loading: true}))
    const { email, password } = this.state
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/login`, { email, password })
      if (res.status === 200) {
        // console.log(`apiLogin handler returned success!`)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const name = user.name
        const logDataResult = await getLogData()
        const logData = logDataResult.data
        const vehicle = logData.vehicle || []
        const log = logData.log || []
        await this.setState({ user: { name, userID, sessionID, cookies, email, vehicle, log, currentlySelectedVehicle: vehicle[0] }, password: '', loading: false })
        this.props.updateUserState(this.state.user)
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

  toggleForgotPassword = () => {
    this.setState({ showForgotPassword: !this.state.showForgotPassword })
  }

  render() {
    return (
      <form className="card" onSubmit={this.apiLogin} method="POST">
        <h2>Login</h2>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} />
        <input className="button" type="submit" value="Log In →" />
        { this.state.loading && <Loading message="logging in..." /> }

        { !this.state.showForgotPassword && 
          <button className="button forgot__password__button" onClick={this.toggleForgotPassword}>Forgot Your Password?</button> }

        { this.state.showForgotPassword &&
          <ForgotPassword toggleForgotPassword={this.toggleForgotPassword} /> }

      </form>
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
    currentlySelectedVehicle: PropTypes.string
  }),
  updateUserState: PropTypes.func.isRequired
}

export default Login
