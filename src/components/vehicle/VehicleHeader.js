import React from 'react'
import PropTypes from 'prop-types'

import VehiclesSelector from './VehiclesSelector'
import '../../styles/vehicle.css'

function VehicleHeader(props) {
  return (
    <div className="vehicleHeader">
      <details>
        <summary>{`${props.vehicle.year || ''} ${props.vehicle.make || 'No Vehicle Available'} ${props.vehicle.model || ''}`}</summary>
        <div className="well vehicle__details__update">
          <VehiclesSelector currentlySelectedVehicle={props.vehicle} vehicles={props.vehicles} />
        </div>
      </details>
    </div>
  )
}

VehicleHeader.propTypes = {
  vehicle: PropTypes.object.isRequired,
  vehicles: PropTypes.array.isRequired
}

export default VehicleHeader