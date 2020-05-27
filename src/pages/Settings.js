import React from 'react'
import PropTypes from 'prop-types'

import Logout from '../components/account/Logout'
import AccountSettings from '../components/account/AccountSettings'
import ThemeSwitcher from '../components/account/ThemeSwitcher'
import VehicleSettings from '../components/vehicle/VehicleSettings'

import '../styles/settings.css'

function Settings(props) {  
  return (
    <div className="inner">
      <h2>Settings</h2>
      
      <div className="padded">
        <VehicleSettings 
          currentlySelectedVehicle={props.user.currentlySelectedVehicle} 
          vehicles={props.user.vehicles} 
          history={props.history} />
        <AccountSettings user={props.user} updateUserState={props.updateUserState} />
        <ThemeSwitcher />
        <Logout history={props.history} user={props.user} updateUserState={props.updateUserState} />
      </div>
    </div>
  )
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
  updateUserState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Settings
