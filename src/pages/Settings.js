import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import VLVin from '../components/VLVin'
import VLManual from '../components/VLManual'
import VLYMM from '../components/VLYMM'

import '../styles/settings.css'

const axios = require('axios')
axios.defaults.withCredentials = true

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        userID: '',
        name: '',
        sessionID: '',
        cookies: '',
        email: '',
        password: ''
      }, 
      showVin: false,
      showManual: false,
      showYearMakeModel: true,
      showLogoutButton: false,
      theme: 'dark',
      loading: true
    }
  }

  componentDidMount() {
    let theme = localStorage.getItem('theme') || this.state.theme
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
    this.setState({ user: this.props.user, theme, loading: false })
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    const newState = {...this.state}
    newState.user[name] = value
    this.setState({ user: newState.user })
  }

  saveVehicle = async vehicleData => {
    // console.log('saving vehicle...')
    // console.log(vehicleData)
    const vehicle = {
      make: vehicleData.make || '',
      model: vehicleData.model || '',
      odometer: vehicleData.odometer || '',
      vin: vehicleData.vin || '',
      year: vehicleData.year || ''
    } 
    await this.setState(prevState => ({ 
      ...prevState,
      user: { 
        ...prevState.user,
        vehicle: [vehicle]
      },
      loading: true
    }))
    // 2T1KY38E23C077319
    // bay@bae.bay
    await this.updateAccount()
  }

  updateAccount = async (event = '') => {
    if (event) event.preventDefault()
    console.log(`/updateAccount handler. Axios posting to ${process.env.REACT_APP_API_DOMAIN}/api/update/account`)

    const { name, email, password } = this.state.user
    const vehicleYear = this.state.user.vehicle[0].year
    const vehicleMake = this.state.user.vehicle[0].make
    const vehicleModel = this.state.user.vehicle[0].model
    const vehicleOdometer = this.state.user.vehicle[0].odometer
    const vin = this.state.user.vehicle[0].vin
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/update/account`, { name, email, password, vehicleYear, vehicleMake, vehicleModel, vehicleOdometer, vin })
      console.dir(res)

      if (res.status === 200) {
        console.log(`updateAccount handler returned success!`)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const name = user.name
        const email = user.email
        const vehicle = user.vehicle
        console.log(vehicle)

        await this.props.updateUserState(this.state.user)
        console.log('app state updated...')
        await this.setState({ user: { name, userID, sessionID, cookies, email, vehicle }, password: '', passwordConfirm: '', loading: false })
        console.log('settings component state updated...')
        console.log(this.state)

        await this.props.history.push('/settings')
      } else {
        console.log('Response received but with status code: '+res.status)
        const error = new Error(res.error)
        throw error
      }
    } catch(err) {
        console.log('Error posting to /update.')
        console.dir(err)
        // console.log(Object.keys(err))
        // console.log(err.message)
        // console.log(err.config.validateStatus())
        // console.log(err.request)
        // console.log(err.response)
        // console.log(err.isAxiosError)
        // console.dir(err.toJSON())
        alert('Error updating account. Please try again.')
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

  logout = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/logout`)
      if (response.status === 200) {
        const userReset = { name: '', userID: '', sessionID: '', cookies: '', email: ''}
        this.props.updateUserState(userReset)
        return this.props.history.push('/')
      } else {
        const error = new Error(response.error)
        throw error
      }
    } catch(err) {
      console.err(err)
    }
  }

  toggleTheme = () => {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    document.documentElement.className = newTheme
    this.setState({ theme: newTheme }) 
  }

  render() {
    const isLoggedIn = (this.props.user && this.props.user.cookies ? this.props.user.cookies.length > 0 : false)
    if (!isLoggedIn) return <Redirect to="/welcome" />

    if (this.state.loading) return <div>Loading...</div>
  
    return (
      <div className="inner">
        <h2>Settings</h2>
        
        <div className="card">
          <h3>Vehicle</h3>
          <div className="current__vehicle">
            { this.state.user && this.state.user.vehicle && this.state.user.vehicle[0] && <>
              <span>{this.state.user.vehicle[0].year}</span>
              <span>{this.state.user.vehicle[0].make}</span>
              <span>{this.state.user.vehicle[0].model}</span>
            </> }
          </div>
          <div className="buttons__holder">
            <span>Find Vehicle By:</span>
            <button className={`lookup__button ${this.state.showYearMakeModel ? 'lookup__selected' : ''}`} onClick={() => this.vehicleLookupChanger('showYearMakeModel')}>Make &amp; Model</button>
            <button className={`lookup__button ${this.state.showVin ? 'lookup__selected' : ''}`} onClick={() => this.vehicleLookupChanger('showVin')}>VIN</button>
            <button className={`lookup__button ${this.state.showManual ? 'lookup__selected' : ''}`} onClick={() => this.vehicleLookupChanger('showManual')}>Manually Enter</button>
          </div>
          <div className="lookupSwitcher">
            <VLVin display={this.state.showVin} currentVehicle={this.state.user.vehicle[0] || {}} saveVehicle={this.saveVehicle} />
            <VLManual display={this.state.showManual} currentVehicle={this.state.user.vehicle[0] || {}} saveVehicle={this.saveVehicle} /> 
            <VLYMM display={this.state.showYearMakeModel} currentVehicle={this.state.user.vehicle[0] || {}} saveVehicle={this.saveVehicle} /> 
          </div>
        </div>

        <form className="card" onSubmit={this.updateAccount} method="POST">
          <h3>Account</h3>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter name..." value={this.state.user.name} onChange={this.handleInputChange} />
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

        <div className="card">
          <h3>Theme Settings</h3>
          <div className="theme__container">
            <label htmlFor="theme">{`${this.state.theme.substring(0,1).toUpperCase()}${this.state.theme.substring(1)} Mode Enabled`}</label>
            <button className="button" onClick={this.toggleTheme}>Switch Theme</button>
          </div>
        </div>

      </div>
    )  
  }
}

export default Settings
