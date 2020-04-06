import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/vehicleHeader.css'

function VehicleHeader(props) {
  return (
    <div>
      <div className="vehicleHeader">
        <details>
          <summary>{`${props.vehicle.year} ${props.vehicle.make} ${props.vehicle.model}`}</summary>
          <div className="vehicle__details__update">
            <Link to="/settings">Add or select a different vehicle</Link>
          </div>
        </details>
      </div>
      {props.children}
    </div>
  )
}

export default VehicleHeader