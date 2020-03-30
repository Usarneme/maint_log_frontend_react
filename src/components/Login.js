import React, { Component } from 'react'
import { getLogData } from '../helpers'

import Loading from './Loading'

const axios = require('axios')
axios.defaults.withCredentials = true

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
      loading: false
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiLogin = async (event) => {
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
        console.log('Error posting to /api/login.')
        console.dir(err)
        alert('Error logging in please try again')
      }
  }

  apiForgot = (event) => {
    event.preventDefault()
    const { email } = this.state
    console.log(`/apiForgot handler: ${email}`)
    // TODO - create back end route and handler
  }

  render() {
    return (
      <div className="inner">
        <form className="form" onSubmit={this.apiLogin} method="POST">
          <h2>Login</h2>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Log In →" />
        </form>

        { this.state.loading && <Loading message="logging in..." /> }

        <form className="form" onSubmit={this.apiForgot} method="POST">
          <h2>I forgot my password!</h2>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Send a Reset" />
        </form>
      </div>
    )
  }
}

export default Login
