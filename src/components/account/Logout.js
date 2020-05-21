import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import UserContext from '../../contexts/UserContext'

function Logout(props) {
  const [showLogoutButton, toggleShowLogoutButton] = useState(false)
  // eslint-disable-next-line
  const {user, updateUserState} = useContext(UserContext)

  const toggleConfirmLogout = event => {
    event.preventDefault()
    toggleShowLogoutButton(!showLogoutButton) // flip true => false => true...
  }

  const apiLogout = async event => {
    event.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/logout`)
      if (response.status === 200) {
        const userReset = { name: '', userID: '', sessionID: '', cookies: '', email: ''}
        updateUserState(userReset)
        return props.history.push('/welcome')
      } else {
        const error = new Error(response.error)
        throw error
      }
    } catch(err) {
      console.err(err)
    }
  }
  return (
    <div className="card">
      <h3>Disconnect Account and Logout</h3>
      <div className="logout__container padded">
        <button className={`button ${showLogoutButton ? 'confirm--active' : 'confirm'}`} onClick={toggleConfirmLogout}>{showLogoutButton ? 'Cancel Logout' : 'Logout'}</button>
        { showLogoutButton && <button className="button disconnect" onClick={apiLogout}><span className="red">Confirm and Logout</span></button> }
      </div>
    </div>
  )
}

Logout.propTypes = {
  history: PropTypes.object.isRequired
}

export default Logout