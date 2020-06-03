import React from 'react'
import PropTypes from 'prop-types'
import LogForm from '../components/log/LogForm'

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
    vehicles: PropTypes.array,
    selectedVehicles: PropTypes.array 
  }),
  updateUserState: PropTypes.func.isRequired
}

export default Add