import React from 'react'

import VehicleHeader from '../components/VehicleHeader'
import LogEntry from '../components/LogEntry'
import LogSorter from '../components/LogSorter'

function Log(props) {
  const isLoggedIn = (props.user.cookies.length > 0)
  const log = props.user.log

  if (isLoggedIn) {
    return (
      <div className="inner">
        <VehicleHeader vehicle={props.user.vehicle[0]}>
          <LogSorter {...props} />
          {log && log.map(entry => <LogEntry key={entry._id} data={entry} />)}
        </VehicleHeader>
      </div>
    )
  }

  return (
    <div className="inner">
      <h2>You must be logged in to view your log...</h2>
    </div>
  )
}

export default Log