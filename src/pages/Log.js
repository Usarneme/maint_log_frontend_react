import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import VehicleHeader from '../components/vehicle/VehicleHeader'
import LogEntry from '../components/log/LogEntry'
import LogSorter from '../components/log/LogSorter'

function Log(props) {
  let log = []
  if (props.user.log && props.user.log.length > 0) log = props.user.log
  const vehicle = props.user.currentlySelectedVehicle || props.user.vehicle[0]

  return (
    <div className="inner">
      <h2>Service History</h2>
      { Object.keys(log).length === 0 &&
        <div className="card no__log">
          <h3>No Log Entries Found!</h3>
          <Link className="button" to="/add">Add A Log Entry Now</Link>
        </div>
      }
 
      { Object.keys(log).length > 0 &&
        <div className="padded">
          <VehicleHeader vehicle={vehicle} vehicles={props.user.vehicles || []} />
          <LogSorter {...props} />
          {log && log.map(entry => <LogEntry key={entry._id} data={entry} />)}
        </div>
      }
    </div>
  )
}

Log.propTypes = {
  user: PropTypes.shape({
    log: PropTypes.array,
    vehicle: PropTypes.array
  })
}

export default Log