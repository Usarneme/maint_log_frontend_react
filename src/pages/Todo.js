import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import VehicleHeader from '../components/VehicleHeader'
import LogEntry from '../components/LogEntry'
import LogSorter from '../components/LogSorter'

function Todo(props) {
  const todoLog = props.user.log.filter(entry => entry.mileageDue !== null || entry.dateDue !== null)

  let vehicle = {}
  if (props.user.vehicle && props.user.vehicle[0]) vehicle = props.user.vehicle[0]

  return (
    <div className="inner">
      <h2>Upcoming Service{Object.keys(todoLog).length > 1 ? 's': ''}</h2>

      { Object.keys(todoLog).length === 0 &&
        <div className="card no__todos">
          <h3>No Future-Due Log Entries Found!</h3>
          <Link className="button" to="/add">Add A Log Entry Now</Link>
          <Link className="button" to="/log">Review Your Log</Link>
        </div>
      }

      { Object.keys(todoLog).length > 0 &&
        <VehicleHeader vehicle={vehicle}>
          <LogSorter {...props} />
          {todoLog && todoLog.map(entry => <LogEntry key={entry._id} data={entry} />)}
        </VehicleHeader>
      }

    </div>
  )
}

Todo.propTypes = {
  user: PropTypes.shape({
    log: PropTypes.array,
    vehicle: PropTypes.array
  })
}

export default Todo