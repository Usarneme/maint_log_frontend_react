import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../styles/vehicleHeader.css'

function VehicleHeader(props) {
  return (
    <div>
      <div className="vehicleHeader">
        <details>
          <summary>{`${props.vehicle.year || ''} ${props.vehicle.make || 'No Vehicle Available'} ${props.vehicle.model || ''}`}</summary>
          <div className="vehicle__details__update">
            <Link to="/settings">Add or select a different vehicle</Link>
          </div>
        </details>
      </div>
      {props.children}
    </div>
  )
}

VehicleHeader.propTypes = {
  vehicle: PropTypes.object.isRequired
}

export default VehicleHeader