import React from 'react'
import { Redirect } from 'react-router-dom'

import VehicleHeader from '../components/VehicleHeader'
import LogEntry from '../components/LogEntry'
import LogSorter from '../components/LogSorter'

function Log(props) {
  const isLoggedIn = (props.user.cookies.length > 0)
  if (!isLoggedIn) return <Redirect to="/welcome" />
  const log = props.user.log

  return (
    <div className="inner">
      <VehicleHeader vehicle={props.user.vehicle[0]}>
        <LogSorter {...props} />
        {log && log.map(entry => <LogEntry key={entry._id} data={entry} />)}
      </VehicleHeader>
    </div>
  )
}

export default Log