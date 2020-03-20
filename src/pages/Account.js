import React, { Component } from 'react'
import { getLogData } from '../helpers'

const axios = require('axios')
axios.defaults.withCredentials = true

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        userID: '',
        username: '',
        sessionID: '',
        cookies: '',
        email: '',
        password: ''
      }
    }
  }

  componentDidMount() {
    this.setState({ user: this.props.user })
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    const newState = {...this.state}
    newState.user[name] = value
    this.setState({ user: newState.user })
  }

  updateAccount = async (event) => {
    event.preventDefault()
    // console.log(`/updateAccount handler. Axios posting to ${process.env.REACT_APP_API_DOMAIN}/api/updateAccount`)

    const { email, password } = this.state.user
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/updateAccount`, { email, password })
      // console.dir(res)

      if (res.status === 200) {
        // console.log(`updateAccount handler returned success!`)
        // console.dir(res)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const username = user.name

        // console.log('GETting log data...')
        const logDataResult = await getLogData()
        const logData = logDataResult.data
        // console.log(`Found log data result of ${logData}`)

        const { vehicle, log } = logData
        // console.log(`success! Returned #${log.length} log entries for vehicle ${vehicle[0]}.`)

        this.setState({ user: { username, userID, sessionID, cookies, email, vehicle, log, password: ''} })
        this.props.updateUserState(this.state.user)

        // this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+res.status)
        const error = new Error(res.error)
        throw error
      }
    } catch(err) {
        console.log('Error posting to /api/login.')
        console.dir(err)
        // console.log(Object.keys(err))
        // console.log(err.message)
        // console.log(err.config.validateStatus())
        // console.log(err.request)
        // console.log(err.response)
        // console.log(err.isAxiosError)
        // console.dir(err.toJSON())
        alert('Error logging in please try again')
      }
  }

  render() {
    const isLoggedIn = (this.props.user.cookies.length > 0)

    if (isLoggedIn) {
      return (
        <div className="inner">
          <form className="form" onSubmit={this.updateAccount} method="POST">
            <h2>Account</h2>
            <label htmlFor="username">User Name</label>
            <input type="text" name="username" placeholder="Enter username..." value={this.state.user.username} onChange={this.handleInputChange} />
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder="Enter email..." value={this.state.user.email} onChange={this.handleInputChange} />
            {/* <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} /> */}
            <input className="button" type="submit" value="Update Account" />
          </form>
        </div>
      )
    }
  
    return (
      <div className="inner">
        <h2>You must be logged in to view your account...</h2>
      </div>
    )
  
  }
}

export default Account
