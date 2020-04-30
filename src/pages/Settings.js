import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from '../components/Loading'
import Logout from '../components/account/Logout'
import ThemeSwitcher from '../components/account/ThemeSwitcher'
import VehicleSettings from '../components/vehicle/VehicleSettings'

import '../styles/settings.css'

const axios = require('axios')
axios.defaults.withCredentials = true

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user || {
        userID: '',
        name: '',
        sessionID: '',
        cookies: '',
        email: '',
        password: '',
        vehicle: [],
        log: []
      }, 
      currentlySelectedVehicle: props.currentlySelectedVehicle || undefined,
      theme: 'dark',
      loading: true
    }
  }

  componentDidMount() {
    let theme = localStorage.getItem('theme') || this.state.theme
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
    this.setState({ 
      user: this.props.user, 
      theme, 
      currentlySelectedVehicle: this.props.currentlySelectedVehicle || this.props.user.vehicle[0] || undefined,
      loading: false })
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
      currentlySelectedVehicle: vehicle,
      loading: true
    }))
    await this.updateAccount()
  }

  updateAccount = async (event = '') => {
    if (event) event.preventDefault()
    // console.log(`/updateAccount handler. Axios posting to ${process.env.REACT_APP_API_DOMAIN}/api/update/account`)

    const { name, email, password } = this.state.user
    const vehicleYear = this.state.user.vehicle[0].year
    const vehicleMake = this.state.user.vehicle[0].make
    const vehicleModel = this.state.user.vehicle[0].model
    const vehicleOdometer = this.state.user.vehicle[0].odometer
    const vin = this.state.user.vehicle[0].vin
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/update/account`, { name, email, password, vehicleYear, vehicleMake, vehicleModel, vehicleOdometer, vin })
      // console.dir(res)

      if (res.status === 200) {
        console.log(`updateAccount handler returned success!`)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const name = user.name
        const email = user.email
        const vehicle = [user.vehicle]
        // console.log(vehicle)

        await this.props.updateUserState(this.state.user)
        // console.log('app state updated...')
        await this.setState({ user: { name, userID, sessionID, cookies, email, vehicle }, password: '', passwordConfirm: '', loading: false })
        // console.log('settings component state updated...')
        // console.log(this.state)
        return this.props.history.push('/settings')
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

  render() {
    if (this.state.loading) return <Loading message='Updating Account...' />
  
    return (
      <div className="inner">
        <h2>Settings</h2>
        
        <VehicleSettings currentlySelectedVehicle={this.state.currentlySelectedVehicle} saveVehicle={this.saveVehicle} />

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

        <ThemeSwitcher currentTheme={this.state.theme} />
        <Logout history={this.props.history} />
      </div>
    )  
  }
}

Settings.propTypes = {
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicle: PropTypes.array
  }),
  currentlySelectedVehicle: PropTypes.object, // default vehicle for which to display info
  history: PropTypes.object.isRequired
}

export default Settings
