import React, { useState } from 'react'
import PropTypes from 'prop-types'

import VLVin from './VLVin'
import VLManual from './VLManual'
import VLYMM from './VLYMM'

import '../../styles/vehicle.css'

function VehicleSettings(props) {
  const [vehicleLookupsShowing, showVehicleLookups] = useState(false)
  const [manualLookupShowing, showManualLookup] = useState(true)
  const [vinLookupShowing, showVinLookup] = useState(false)
  const [yearMakeModelLookupShowing, showYearMakeModelLookup] = useState(false)

  function vehicleLookupChanger(view) {
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

  return (
    <div className="card">
      <h3>{`Vehicle${(props.vehicles && props.vehicles.length) > 1 ? "s": ""}`}</h3>
      { (props.vehicles && props.vehicles.length > 0) ?
        props.vehicles.map(vehicle => {
          return <div className={`${vehicle.primary ? 'vehicle__container primary' : 'vehicle__container'}`}>
            <div className="vehicle__data__container">
              <span>{vehicle.year}</span>
              <span>{vehicle.make}</span>
              <span>{vehicle.model}</span>
            </div>
            <div className="checkboxes__container">
              <label htmlFor={vehicle.id} >Main Vehicle</label>
              <input type="checkbox" name={vehicle.id} disabled checked={vehicle.primary} onChange={() => vehicleLookupChanger('showManualLookup')} />
            </div>
            <div className="buttons__holder">
              <button className="button" onClick={() => vehicleLookupChanger('showManualLookup')} >Edit Vehicle</button>
            </div>
          </div>
        }) : <span>(none)</span>
      }
      
      <div className="add__vehicle__container">
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
              { vinLookupShowing && <VLVin currentVehicle={props.currentlySelectedVehicle} saveVehicleChanges={props.saveVehicleChanges} /> }
              { manualLookupShowing && <VLManual currentVehicle={props.currentlySelectedVehicle} saveVehicleChanges={props.saveVehicleChanges} /> }
              { yearMakeModelLookupShowing && <VLYMM currentVehicle={props.currentlySelectedVehicle} saveVehicleChanges={props.saveVehicleChanges} /> }
            </div>
          </> }
        { !vehicleLookupsShowing && 
            <div className="buttons__holder">
              <button className="button" onClick={() => showVehicleLookups(true)} >Search For A Vehicle</button>
            </div>
        }
      </div>
    </div>
  )
}

VehicleSettings.propTypes = {
  vehicles: PropTypes.array.isRequired,
  currentlySelectedVehicle: PropTypes.object,
  saveVehicleChanges: PropTypes.func.isRequired
}

export default VehicleSettings