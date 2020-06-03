import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import VehicleHeader from '../components/vehicle/VehicleHeader'
import LogEntry from '../components/log/LogEntry'
import LogSorter from '../components/log/LogSorter'

function Log(props) {
  // Array containing the IDs of all vehicles currently selected for view
  // defaults to the primary vehicle, first vehicle saved to the user account, or an empty array
  const [currentVehicles, changeCurrentVehicles] = useState(
    props.user.currentlySelectedVehicle._id || (props.user.vehicles[0] && props.user.vehicles[0]._id) || []
  )
  // Array of log entries to display 
  let log = []
  // limit log entries based on vehicle
  if (props.user.log && props.user.log.length > 0) {
    log = props.user.log.filter(logEntry => currentVehicles.includes(logEntry.vehicle))
  }

  // TODO add in a Vehicle Selector component

  return (
    <div className="inner">
      <h2>Service History</h2>
      { log.length === 0 &&
        <div className="card no__log">
          <h3>No Log Entries Found!</h3>
          <Link className="button" to="/add">Add A Log Entry Now</Link>
        </div>
      }
 
      { log.length > 0 &&
        <div className="padded">
          <VehicleHeader vehicle={currentVehicles} vehicles={props.user.vehicles || []} />
          <LogSorter {...props} />
          {log && log.map(entry => <LogEntry key={entry._id} data={entry} />)}
        </div>
      }
    </div>
  )
}

Log.propTypes = {
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicles: PropTypes.array,
    currentlySelectedVehicle: PropTypes.object
  })
}

export default Log