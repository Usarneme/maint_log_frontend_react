import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import VLVin from './VLVin'
import VLManual from './VLManual'
import VLYMM from './VLYMM'
import Loading from '../Loading'

import UserContext from '../../contexts/UserContext'
import { addVehicle, updateVehicle } from '../../helpers'
import '../../styles/vehicle.css'

function VehicleSettings(props) {
  const [vehicleLookupsShowing, showVehicleLookups] = useState(false)
  const [manualLookupShowing, showManualLookup] = useState(true)
  const [vinLookupShowing, showVinLookup] = useState(false)
  const [yearMakeModelLookupShowing, showYearMakeModelLookup] = useState(false)
  // eslint-disable-next-line
  const {user, updateUserState} = useContext(UserContext)
  const [loading, setLoading] = useState(false)

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

  const saveNewVehicle = async vehicle => {
    setLoading(true)
    // ensure even optional properties are sent to the server/db
    vehicle.make = vehicle.make || ''
    vehicle.model = vehicle.model || ''
    vehicle.odometer = vehicle.odometer || 0
    vehicle.vin = vehicle.vin || ''
    vehicle.year = vehicle.year || ''
    vehicle.primary = vehicle.primary || false
    // ensure unnecessary state items are not passed to the server/db
    delete vehicle.models // from year+make+model vehicle lookup
    delete vehicle.showConfirmButton // from year+make+model vehicle lookup

    console.log('Save New Vehicle in VehicleSettings. Adding vehicle:')
    console.dir(vehicle)
    const newVehicle = await addVehicle(vehicle)
    console.log('returned to saveNewVehicle in VehicleSettings with newVehicle:')
    console.log(newVehicle)
    updateUserState({ ...user, ...user.vehicles.push(newVehicle) })
    setLoading(false)
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

    const updates = await updateVehicle(vehicle)
    console.log(updates)
  }

  if (loading) return <Loading message="Loading Vehicle settings..." />

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
            <div>
              { vehicle.primary && <span className="flexy">Main <input type="checkbox" checked disabled /></span> }
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
              { vinLookupShowing && <VLVin currentVehicle={props.currentlySelectedVehicle || {}} saveNewVehicle={saveNewVehicle} /> }
              { yearMakeModelLookupShowing && <VLYMM currentVehicle={props.currentlySelectedVehicle || {}} saveNewVehicle={saveNewVehicle} /> }
              { manualLookupShowing && <VLManual currentVehicle={props.currentlySelectedVehicle || {}} saveNewVehicle={saveNewVehicle} saveVehicleChanges={saveVehicleChanges} /> }
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