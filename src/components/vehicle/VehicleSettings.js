import React, { useState } from 'react'
import PropTypes from 'prop-types'

import VLVin from './VLVin'
import VLManual from './VLManual'
import VLYMM from './VLYMM'

import { add, update, updateUserAccount } from '../../helpers'
import '../../styles/vehicle.css'

function VehicleSettings(props) {
  const [vehicleLookupsShowing, showVehicleLookups] = useState(false)
  const [manualLookupShowing, showManualLookup] = useState(true)
  const [vinLookupShowing, showVinLookup] = useState(false)
  const [yearMakeModelLookupShowing, showYearMakeModelLookup] = useState(false)

  const vehicleLookupChanger = view => {
    showVehicleLookups(true)
    showVinLookup(false)
    showManualLookup(false)
    showYearMakeModelLookup(false)
    // view useState toggles: showYearMakeModelLookup, showVinLookup, or showManualLookup
    // [view](true) -- TODO make this dynamic function call work instead of the switch...
    switch (view) {
      case 'showVinLookup': 
        showVinLookup(true)
        break
      case 'showManualLookup': 
        showManualLookup(true)
        break
      case 'showYearMakeModelLookup': 
        showYearMakeModelLookup(true)
        break
      default: showYearMakeModelLookup(true)
    }
  }

  const saveNew = async vehicle => {
    // ensure even optional properties are sent to the server/db
    vehicle.make = vehicle.make || ''
    vehicle.model = vehicle.model || ''
    vehicle.odometer = vehicle.odometer || ''
    vehicle.vin = vehicle.vin || ''
    vehicle.year = vehicle.year || ''
    vehicle.primary = vehicle.primary || false

    const updates = await add(vehicle)
    console.log(updates)
  }

  const saveVehicleChanges = async vehicle => {
    // ensure even optional properties are sent to the server/db
    vehicle.make = vehicle.make || ''
    vehicle.model = vehicle.model || ''
    vehicle.odometer = vehicle.odometer || ''
    vehicle.vin = vehicle.vin || ''
    vehicle.year = vehicle.year || ''
    vehicle.primary = vehicle.primary || false
    vehicle.id = vehicle.id || ''

    const updates = await update(vehicle)
    console.log(updates)
  }

  return (
    <div className="card">
      <h3>{`Vehicle${(props.vehicles && props.vehicles.length) > 1 ? "s": ""}`}</h3>
      { (props.vehicles && props.vehicles.length > 0) ?
        props.vehicles.map(vehicle => {
          return <div key={vehicle.make+vehicle.year+vehicle.model} className={`${vehicle.primary ? 'vehicle__container padded primary' : 'vehicle__container padded'}`}>
            <div className="well vehicle__data__container">
              <span>{vehicle.year}</span>
              <span>{vehicle.make}</span>
              <span>{vehicle.model}</span>
            </div>
            { vehicle.primary && <span className="flexy">Main <input type="checkbox" checked disabled /></span> }
            <div className="buttons__holder">
              <button className="button" onClick={() => vehicleLookupChanger('showManualLookup')} >Edit Vehicle</button>
            </div>
          </div>
        }) : <span>(none)</span>
      }
      
      <div className="add__vehicle__container padded">
        { vehicleLookupsShowing && 
          <>
            <div className="buttons__holder">
              <button className="button" onClick={() => showVehicleLookups(false)} >Hide Vehicle Search</button>
            </div>
            <div className="buttons__holder">
              <span>Find Vehicle By:</span>
              <button className={`lookup__button ${yearMakeModelLookupShowing ? 'lookup__selected' : ''}`} onClick={() => vehicleLookupChanger('showYearMakeModelLookup')}>Make &amp; Model</button>
              <button className={`lookup__button ${vinLookupShowing ? 'lookup__selected' : ''}`} onClick={() => vehicleLookupChanger('showVinLookup')}>VIN</button>
              <button className={`lookup__button ${manualLookupShowing ? 'lookup__selected' : ''}`} onClick={() => vehicleLookupChanger('showManualLookup')}>Manually Enter</button>
            </div>
            <div className="lookupSwitcher">
              { vinLookupShowing && <VLVin currentVehicle={props.currentlySelectedVehicle} saveVehicleChanges={saveVehicleChanges} /> }
              { manualLookupShowing && <VLManual currentVehicle={props.currentlySelectedVehicle} saveVehicleChanges={saveVehicleChanges} /> }
              { yearMakeModelLookupShowing && <VLYMM currentVehicle={props.currentlySelectedVehicle} saveVehicleChanges={saveVehicleChanges} /> }
            </div>
          </> }
          
        { !vehicleLookupsShowing && 
            <div className="buttons__holder">
              <button className="button" onClick={() => showVehicleLookups(true)} >Add A New Vehicle</button>
            </div>
        }
      </div>
    </div>
  )
}

VehicleSettings.propTypes = {
  vehicles: PropTypes.array.isRequired,
  currentlySelectedVehicle: PropTypes.object
}

export default VehicleSettings