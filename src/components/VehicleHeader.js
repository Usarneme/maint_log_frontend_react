import React from 'react'
// import { Link, NavLink } from 'react-router-dom'

import '../styles/vehicleHeader.css'

function VehicleHeader(props) {
  return (
    <div className="vehicleHeader">
      <span>{`${props.vehicle.year} ${props.vehicle.make} ${props.vehicle.model}`}</span>
      {props.children}
    </div>
  )
}

export default VehicleHeader