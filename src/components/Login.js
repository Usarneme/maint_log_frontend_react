import React, { Component } from 'react'
import { getLogData } from '../helpers'

import Loading from './Loading'
import '../styles/login.css'

const axios = require('axios')
// axios.defaults.withCredentials = true

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: {
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
        const username = user.name
        const logDataResult = await getLogData()
        const logData = logDataResult.data
        const { vehicle, log } = logData
        this.setState({ user: { username, userID, sessionID, cookies, email, vehicle, log }, password: '', loading: false })
        this.props.updateUserState(this.state.user)

        this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+res.status)
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

  toggleForgotPassword = event => {
    event.preventDefault()
    this.setState({ showForgotPassword: !this.state.showForgotPassword })
  }

  apiForgot = event => {
    event.preventDefault()
    const { email } = this.state
    console.log(`/apiForgot handler: ${email}`)
    // TODO - create back end route and handler
  }

  render() {
    return (
      <div className="inner">
        <form className="card" onSubmit={this.apiLogin} method="POST">
          <h2>Login</h2>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Log In →" />
          { !this.state.showForgotPassword && 
            <button className="button forgot__password__button" onClick={event => this.toggleForgotPassword(event)}>Forgot Your Password?</button> 
          }
        </form>

        { this.state.loading && <Loading message="logging in..." /> }

        { this.state.showForgotPassword && 
          <form className="card" onSubmit={this.apiForgot} method="POST">
            <h2>I forgot my password!</h2>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
            <input className="button" type="submit" value="Send a Reset" />
            <button className="button forgot__password__button" onClick={event => this.toggleForgotPassword(event)}>Hide Forgot Password Input</button> 
          </form>
        }
      </div>
    )
  }
}

export default Login
