import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import VLVin from '../components/VLVin'
import VLManual from '../components/VLManual'
import VLYMM from '../components/VLYMM'

import { getLogData } from '../helpers'
import '../styles/settings.css'

const axios = require('axios')
axios.defaults.withCredentials = true

class Settings extends Component {
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
      }, 
      showVin: false,
      showManual: false,
      showYearMakeModel: true,
      showLogoutButton: false
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
        console.log('Error posting to /api/updateAccount.')
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

  vehicleLookupChanger = view => {
    this.setState({
      showVin: false,
      showManual: false,
      showYearMakeModel: false,
      [view]: true
    })
  }

  toggleConfirmLogout = event => {
    event.preventDefault()
    this.setState({ showLogoutButton: !this.state.showLogoutButton })
  }

  logout = event => {
    event.preventDefault()
    // console.log(`logout handler. POST fetching: ${process.env.REACT_APP_API_DOMAIN}/api/logout`)
    fetch(`${process.env.REACT_APP_API_DOMAIN}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        // console.log(`logout handler returned success!`)
        const userReset = { username: '', userID: '', sessionID: '', cookies: '', email: ''}
        this.props.updateUserState(userReset)
        return this.props.history.push('/')
      } else {
        const error = new Error(res.error)
        throw error
      }
    })
    .catch(err => {
      console.error(err)
      alert('Error logging out please try again')
    })
  }

  render() {
    const isLoggedIn = (this.props.user.cookies.length > 0)
    if (!isLoggedIn) return <Redirect to="/welcome" />
  
    return (
      <div className="inner">
        <h2>Settings</h2>
        
        <div className="card">
          <h3>Vehicle</h3>
          <div className="buttons__holder">
            <span>Find Vehicle By:</span>
            <button className={`lookup__button ${this.state.showYearMakeModel ? 'lookup__selected' : ''}`} onClick={() => this.vehicleLookupChanger('showYearMakeModel')}>Make &amp; Model</button>
            <button className={`lookup__button ${this.state.showVin ? 'lookup__selected' : ''}`} onClick={() => this.vehicleLookupChanger('showVin')}>VIN</button>
            <button className={`lookup__button ${this.state.showManual ? 'lookup__selected' : ''}`} onClick={() => this.vehicleLookupChanger('showManual')}>Manually Enter</button>
          </div>
          <div className="lookupSwitcher">
            {this.state.showVin && <VLVin />}
            {this.state.showManual && <VLManual />}
            {this.state.showYearMakeModel && <VLYMM />}
          </div>
        </div>

        <form className="card" onSubmit={this.updateAccount} method="POST">
          <h3>Account</h3>
          <label htmlFor="username">User Name</label>
          <input type="text" name="username" placeholder="Enter username..." value={this.state.user.username} onChange={this.handleInputChange} />
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.user.email} onChange={this.handleInputChange} />
          {/* <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} /> */}
          <input className="button" type="submit" value="Update Account" />
        </form>

        <div className="card">
          <h3>Disconnect Account and Logout</h3>
          <div className="logout__container">
            <button className={`button ${this.state.showLogoutButton ? 'confirm--active' : 'confirm'}`} onClick={this.toggleConfirmLogout}>{this.state.showLogoutButton ? 'Cancel Logout' : 'Logout'}</button>
            { this.state.showLogoutButton && <button className="button disconnect" onClick={this.logout}><span className="red">Confirm and Logout</span></button> }
          </div>
        </div>

      </div>
    )  
  }
}

export default Settings
