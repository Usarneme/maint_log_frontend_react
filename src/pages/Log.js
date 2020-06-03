import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import VehiclesSelector from '../components/vehicle/VehiclesSelector'
import LogEntry from '../components/log/LogEntry'
import LogSorter from '../components/log/LogSorter'

function Log(props) {
  // Array containing the IDs of all vehicles currently selected for view
  // the currentVehicles array defaults to the primary/currentlySelected vehicle, 
  const [currentVehicles, changeCurrentVehicles] = useState( [ props.user.currentlySelectedVehicle.id ] || [ (props.user.vehicles.length > 0 && props.user.vehicles[0].id) ] || [])
  // Array of log entries to display 
  const [entriesShowing, changeEntriesShowing] = useState([])

  useEffect(() => {
    // only show log entries for selected vehicle(s)
    if (props.user.log && props.user.log.length > 0) {
      const log = props.user.log.filter(logEntry => currentVehicles.includes(logEntry.vehicle))
      changeEntriesShowing(log)
    }
  }, [props.user.log]) 

  const changeVehicleStatus = event => {
    const clickedOnVehicleId = event.target.name
    console.log(clickedOnVehicleId) // the id of the vehicle
    let vehicleUpdates = []
    // if it is already in the list, remove it
    if (currentVehicles.includes(clickedOnVehicleId)) {
      console.log('current vehicles includes this vehicle ID already. Removing it.')
      const vehicleObjects = currentVehicles.filter(vehicleId => vehicleId !== clickedOnVehicleId)
      console.log(vehicleObjects)
      vehicleUpdates = vehicleObjects
    } else { // if it was not in the list, add it
      console.log('current vehicles does not include this vehicle ID. Adding it.')
      vehicleUpdates = currentVehicles
      vehicleUpdates.push(clickedOnVehicleId)
    }
    console.log('Updating which vehicles are displayed: ')
    console.log(vehicleUpdates)
    changeCurrentVehicles(vehicleUpdates)
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
          <VehiclesSelector allVehicles={props.user.vehicles} currentVehicles={currentVehicles} changeCurrentVehicles={changeVehicleStatus} />
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
    currentlySelectedVehicle: PropTypes.object
  })
}

export default Log