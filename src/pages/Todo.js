import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import VehiclesSelector from '../components/vehicle/VehiclesSelector'
import LogEntry from '../components/log/LogEntry'
import LogSorter from '../components/log/LogSorter'

function Todo(props) {
  const todoLog = props.user.log.filter(entry => entry.mileageDue !== null || entry.dateDue !== null)
  const vehicle = props.user.currentlySelectedVehicle || props.user.vehicles[0] || {}

  return (
    <div className="inner">
      <h2>Upcoming Service{Object.keys(todoLog).length > 1 ? 's': ''}</h2>

      { Object.keys(todoLog).length === 0 &&
        <div className="card no__todos padded">
          <h3>No Future-Due Log Entries Found!</h3>
          <Link className="button" to="/add">Add A Log Entry Now</Link>
          <Link className="button" to="/log">Review Your Log</Link>
        </div>
      }

      { Object.keys(todoLog).length > 0 &&
        <div className="padded">
          <VehiclesSelector vehicle={vehicle} vehicles={props.user.vehicles || []} />
          <LogSorter {...props} />
          {todoLog && todoLog.map(entry => <LogEntry key={entry._id} data={entry} />)}
        </div>
      }

    </div>
  )
}

Todo.propTypes = {
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
}

export default Todo