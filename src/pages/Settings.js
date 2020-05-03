import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from '../components/Loading'
import Logout from '../components/account/Logout'
import ThemeSwitcher from '../components/account/ThemeSwitcher'
import VehicleSettings from '../components/vehicle/VehicleSettings'

import { updateUserAccount } from '../helpers'
import '../styles/settings.css'

const axios = require('axios')
axios.defaults.withCredentials = true

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
      currentlySelectedVehicle: {},
      theme: 'dark',
      loading: true
    }
  }

  componentDidMount() {
    let theme = localStorage.getItem('theme') || this.state.theme
    localStorage.setItem('theme', theme)
    document.documentElement.className = theme
    this.setState({ 
      name: this.props.user.name || '',
      email: this.props.user.email || '',
      currentlySelectedVehicle: this.props.user.currentlySelectedVehicle || {}, 
      theme, 
      loading: false 
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.setState({ ...this.props, loading: false })
    }
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  saveVehicle = async vehicleData => {
    // ensure even optional properties are sent to the server/db...
    const newVehicle = {
      make: vehicleData.make || '',
      model: vehicleData.model || '',
      odometer: vehicleData.odometer || '',
      vin: vehicleData.vin || '',
      year: vehicleData.year || '',
      primary: vehicleData.primary || false,
      id: vehicleData.id || ''
    } 

    // a new vehicle won't have an ID
    // this is for overwriting changes made to an extant vehicle 
    const vehicles = this.props.user.vehicle.filter(car => {
      return car.id !== vehicleData.id
    })

    const userUpdates = {...this.props.user}
    userUpdates.vehicle = [...vehicles, newVehicle]
    userUpdates.currentlySelectedVehicle = newVehicle

    // response = { log: [], vehicle: [] }
    const updates = await updateUserAccount(userUpdates)
    // console.log('Returned updated User from backend: ')
    // console.log(updates)
    const updatedUser = this.props.user
    updatedUser.log = updates.log
    updatedUser.vehicle = updates.vehicle
    updatedUser.currentlySelectedVehicle = newVehicle
    // console.log(updatedUser)
    this.props.updateUserState(updatedUser)
  }

  updateAccount = async (event = '') => {
    // called via form (with event) and via onChange of children components (without event)
    if (event) event.preventDefault()
    const userUpdates = {...this.props.user}
    userUpdates.name = this.state.name
    userUpdates.email = this.state.email
    // TODO confirmation and password changing option

    // response = { log: [], vehicle: [] }
    const updates = await updateUserAccount(userUpdates)
    // console.log('Returned updated User from backend: ')
    // console.log(updates)
    const updatedUser = this.props.user
    updatedUser.log = updates.log
    updatedUser.vehicle = updates.vehicle
    updatedUser.currentlySelectedVehicle = this.state.currentlySelectedVehicle
    // console.log(updatedUser)
    this.props.updateUserState(updatedUser)
  }

  render() {
    if (this.state.loading) return <Loading message='Updating Account...' />
  
    return (
      <div className="inner">
        <h2>Settings</h2>
        
        <VehicleSettings currentlySelectedVehicle={this.props.user.currentlySelectedVehicle} saveVehicle={this.saveVehicle} />

        <form className="card" onSubmit={this.updateAccount} method="POST">
          <h3>Account</h3>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder={this.props.user.name ? this.props.user.name : `Enter name...`} value={this.state.name} onChange={this.handleInputChange} />
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder={this.props.user.email ? this.props.user.email : `Enter email...`} value={this.state.email} onChange={this.handleInputChange} />
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
    vehicle: PropTypes.array,
    currentlySelectedVehicle: PropTypes.object
  }),
  history: PropTypes.object.isRequired
}

export default Settings
