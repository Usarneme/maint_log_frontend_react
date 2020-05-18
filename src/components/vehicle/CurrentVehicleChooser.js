import React, { useState } from 'react'
import PropTypes from 'prop-types'

function CurrentVehicleChooser(props) {
  const {selectedVehicle, changeSelectedVehicle} = useState({})

  return (
    <div>
      <h3>Your Vehicles: </h3>
      <div>
        { props.currentlySelectedVehicle && <div className="current__vehicle">
          <strong>Current Vehicle: </strong>
          <span>{props.currentlySelectedVehicle.year}</span>
          <span>{props.currentlySelectedVehicle.make}</span>
          <span>{props.currentlySelectedVehicle.model}</span>
        </div> }
        { props.vehicles && props.vehicles.length > 0 && props.vehicles.map(vehicle => {
          if (vehicle.id !== props.currentlySelectedVehicle.id) {
            return (<div className="vehicles">
              <span>{vehicle.year}</span>
              <span>{vehicle.make}</span>
              <span>{vehicle.model}</span>
            </div>)
          }
        }) }
      </div>
    </div>
  )
}

CurrentVehicleChooser.propTypes = {
  vehicles: PropTypes.array,
  currentlySelectedVehicle: PropTypes.object
}

export default CurrentVehicleChooser