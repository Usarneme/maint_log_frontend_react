import React from 'react'
import { Redirect } from 'react-router-dom'

import VehicleHeader from '../components/VehicleHeader'
import LogEntry from '../components/LogEntry'
import LogSorter from '../components/LogSorter'

function Todo(props) {
  const isLoggedIn = (props.user.cookies.length > 0)
  if (!isLoggedIn) return <Redirect to="/welcome" />
  const todoLog = props.user.log.filter(entry => entry.mileageDue !== null || entry.dateDue !== null)

  return (
    <div className="inner">
      <VehicleHeader vehicle={props.user.vehicle[0]}>
        <LogSorter {...props} />
        {todoLog && todoLog.map(entry => <LogEntry key={entry._id} data={entry} />)}
      </VehicleHeader>
    </div>
  )
}

export default Todo