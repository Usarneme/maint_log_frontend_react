import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import VehiclesSelector from '../components/vehicle/VehiclesSelector'
import LogEntry from '../components/log/LogEntry'
import LogSorter from '../components/log/LogSorter'

function Log(props) {
  // [] Contains String IDs of all vehicles currently selected for view
  // Defaults to the currently selectedVehicle(s) ID(s), the first ID in the user's vehicles array, or an empty []
  const [vehiclesShowing, changeVehiclesShowing] = useState([ (props.user.selectedVehicles.length > 0 && props.user.selectedVehicles[0].id) ] || [ (props.user.vehicles.length > 0 && props.user.vehicles[0].id) ] || [])
  console.log('Vehicles Showing state set:')
  console.log(vehiclesShowing)
  // [] Contains log entries that will be rendered (as that log entry's vehicle has been selected) 
  const [entriesShowing, changeEntriesShowing] = useState(props.user.log.filter(logEntry => vehiclesShowing.includes(logEntry.vehicle)))
  console.log('entries showing state set:')
  console.log(entriesShowing)

  const changeVehicleStatus = event => {
    const clickedOnVehicleId = event.target.name
    console.log(`Changing click status for vehicle id: ${clickedOnVehicleId}.`)
    let vehicleUpdates = []
    // if it is already in the list, remove it
    if (vehiclesShowing.includes(clickedOnVehicleId)) {
      console.log('current vehicles includes this vehicle ID already. Removing it.')
      const vehicleObjects = vehiclesShowing.filter(vehicleId => vehicleId !== clickedOnVehicleId)
      console.log(vehicleObjects)
      vehicleUpdates = vehicleObjects
    } else { // if it was not in the list, add it
      console.log('current vehicles does not include this vehicle ID. Adding it.')
      vehicleUpdates = vehiclesShowing
      vehicleUpdates.push(clickedOnVehicleId)
    }
    console.log('Updating which vehicles are displayed: ')
    console.log(vehicleUpdates)
    changeVehiclesShowing(vehicleUpdates)
  }

  return (
    <div className="inner">
      <h2>Service History</h2>
      { entriesShowing.length === 0 &&
        <div className="card no__log">
          <h3>No Log Entries Found!</h3>
          <Link className="button" to="/add">Add A Log Entry Now</Link>
        </div>
      }
 
      { entriesShowing.length > 0 &&
        <div className="padded">
          <VehiclesSelector allVehicles={props.user.vehicles} vehiclesShowing={vehiclesShowing} changeVehiclesShowing={changeVehicleStatus} />
          <LogSorter {...props} />
          {entriesShowing && entriesShowing.map(entry => <LogEntry key={entry._id} data={entry} />)}
        </div>
      }
    </div>
  )
}

Log.propTypes = {
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicles: PropTypes.array,
    selectedVehicles: PropTypes.array
  })
}

export default Log