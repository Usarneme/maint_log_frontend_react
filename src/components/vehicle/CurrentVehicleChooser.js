import React, { useState } from 'react'
import PropTypes from 'prop-types'

function CurrentVehicleChooser(props) {
  const {selectedVehicle, changeSelectedVehicle} = useState({})

  return (
    <div>
      <h3>Your Vehicles: </h3>
      <div>
        { JSON.stringify(props.currentlySelectedVehicle) }
        { props.vehicles.map(vehicle => JSON.stringify(vehicle)) }
      </div>
    </div>
  )
}

CurrentVehicleChooser.propTypes = {
  vehicles: PropTypes.array,
  currentlySelectedVehicle: PropTypes.object
}

export default CurrentVehicleChooser