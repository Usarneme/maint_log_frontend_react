import React from 'react'
import { Redirect } from 'react-router-dom'

import VehicleHeader from '../components/VehicleHeader'
import LogEntry from '../components/LogEntry'
import LogSorter from '../components/LogSorter'

function Log(props) {
  const isLoggedIn = (props.user && props.user.cookies ? props.user.cookies.length > 0 : false)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  const log = props.user.log
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

export default Log