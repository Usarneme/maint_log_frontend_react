import React from 'react'
import PropTypes from 'prop-types'
import LogForm from '../components/LogForm'

function Add(props) {
  return <LogForm {...props} />
}

Add.propTypes = {
  history: PropTypes.object.isRequired,
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
  updateUserState: PropTypes.func.isRequired
}

export default Add