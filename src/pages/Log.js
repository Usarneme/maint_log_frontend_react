import React from 'react'
import PropTypes from 'prop-types'

import VehicleHeader from '../components/VehicleHeader'
import LogEntry from '../components/LogEntry'
import LogSorter from '../components/LogSorter'

function Log(props) {
  if (!props ) return null
  if (props === {} ) return null
  if (Object.keys(props).length === 0) return null
  if (!props.user) return null
  if (Object.keys(props.user).length === 0) return null
  
  const { log } = props.user
  if (!log) return null

  let vehicle = {}
  if (props.user.vehicle && props.user.vehicle[0]) {
    vehicle = props.user.vehicle[0]
  }

  return (
    <div className="inner">
      <h2>Service History</h2>
      <VehicleHeader vehicle={vehicle}>
        <LogSorter {...props} />
        {log && log.map(entry => <LogEntry key={entry._id} data={entry} />)}
      </VehicleHeader>
    </div>
  )
}

Log.propTypes = {
  user: PropTypes.shape({
    log: PropTypes.arrayOf(PropTypes.object).isRequired
  })
}

export default Log