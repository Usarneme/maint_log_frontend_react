import React from 'react'

import VehicleHeader from '../components/VehicleHeader'
import LogAsTable from '../components/LogAsTable'

function Log(props) {
  const isLoggedIn = (props.user.cookies.length > 0)

  if (isLoggedIn) {
    return (
      <div className="inner">
        <VehicleHeader vehicle={props.user.vehicle[0]}>
          <LogAsTable log={props.user.log} />
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