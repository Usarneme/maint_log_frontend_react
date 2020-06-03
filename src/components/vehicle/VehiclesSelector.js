import React from 'react'
import PropTypes from 'prop-types'

function VehiclesSelector(props) {
  return (
    <div className="vehiclesSelector vehicles">
      <div className="vehicleHeader">
        <span>Your Vehicles: </span>
        { (!props.allVehicles || props.allVehicles.length === 0) && <span>(none)</span> }
      </div>
      { props.allVehicles && props.allVehicles.length > 0 && props.allVehicles.map(vehicle => {
        return (
          <div key={vehicle.id} className="well vehicle">
            <p>{vehicle.year} {vehicle.make} {vehicle.model}</p>
            <input type="checkbox" checked={props.currentVehicles.includes(vehicle.id)} name={vehicle.id} onChange={props.changeCurrentVehicles} /> 
          </div>
        )
      }) }
    </div>
  )
}

VehiclesSelector.propTypes = {
  allVehicles: PropTypes.array, // an array of all vehicle data { id, year, make model etc }
  currentVehicles: PropTypes.array, // an array[] of 0+ vehicle IDs that are currently selected for viewing
  changeCurrentVehicles: PropTypes.func // Log and Todo pages use this to render entries based on selected vehicles
}

export default VehiclesSelector
