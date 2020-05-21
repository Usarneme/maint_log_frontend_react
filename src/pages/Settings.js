import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from '../components/Loading'
import Logout from '../components/account/Logout'
import AccountSettings from '../components/account/AccountSettings'
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

  saveVehicleChanges = async vehicleData => {
    await this.setState({ loading: true })
    // ensure even optional properties are sent to the server/db
    const newVehicle = {
      make: vehicleData.make || '',
      model: vehicleData.model || '',
      odometer: vehicleData.odometer || '',
      vin: vehicleData.vin || '',
      year: vehicleData.year || '',
      primary: vehicleData.primary || false,
      id: vehicleData.id || ''
    } 
    // for overwriting changes made to an extant vehicle as new vehicles do not have an ID
    const vehicles = this.props.user.vehicles.filter(car => {
      return car.id !== vehicleData.id
    })
    const userUpdates = {...this.props.user}
    userUpdates.vehicles = [...vehicles, newVehicle]
    userUpdates.currentlySelectedVehicle = newVehicle
    const updates = await updateUserAccount(userUpdates)
    const updatedUser = this.props.user
    updatedUser.log = updates.log
    updatedUser.vehicles = updates.vehicles
    updatedUser.currentlySelectedVehicle = newVehicle
    await this.props.updateUserState(updatedUser)
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) return <Loading message='Loading Account Details...' />
  
    return (
      <div className="inner">
        <h2>Settings</h2>
        
        <div className="padded">
          <VehicleSettings 
            currentlySelectedVehicle={this.props.user.currentlySelectedVehicle} 
            saveVehicleChanges={this.saveVehicleChanges} 
            vehicles={this.props.user.vehicles}
          />

          <AccountSettings user={this.props.user} />
          <ThemeSwitcher currentTheme={this.state.theme} />
          <Logout history={this.props.history} />
        </div>
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
    vehicles: PropTypes.array,
    currentlySelectedVehicle: PropTypes.object
  }),
  history: PropTypes.object.isRequired
}

export default Settings
