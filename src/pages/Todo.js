import React from 'react'
import PropTypes from 'prop-types'

import VehicleHeader from '../components/VehicleHeader'
import LogEntry from '../components/LogEntry'
import LogSorter from '../components/LogSorter'

function Todo(props) {
  if (!props 
    || props === {} 
    || (Object.keys(props).length === 0 && props.constructor === Object)
    || (Object.keys(props.user).length === 0 && props.user.constructor === Object)
    || !props.user || !props.user.log || props.user.log.length < 1) return null

  const todoLog = props.user.log.filter(entry => entry.mileageDue !== null || entry.dateDue !== null)

  let vehicle = {}
  if (props.user.vehicle && props.user.vehicle[0]) {
    vehicle = props.user.vehicle[0]
  }

  return (
    <div className="inner">
      <h2>Upcoming Service{todoLog.length > 1 ? 's': ''}</h2>
      <VehicleHeader vehicle={vehicle} >
        <LogSorter {...props} />
        {todoLog && todoLog.map(entry => <LogEntry key={entry._id} data={entry} />)}
      </VehicleHeader>
    </div>
  )
}

Todo.propTypes = {
  user: PropTypes.shape({
    log: PropTypes.arrayOf(PropTypes.object).isRequired
  })
}

export default Todo