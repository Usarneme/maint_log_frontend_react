import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import VLVin from './VLVin'
import VLManual from './VLManual'
import VLYMM from './VLYMM'
import Loading from '../Loading'

import UserContext from '../../contexts/UserContext'
import { addVehicle, updateVehicle, getLogData } from '../../helpers'
import '../../styles/vehicle.css'

function VehicleSettings(props) {
  const [vehicleLookupsShowing, showVehicleLookups] = useState(false)
  const [manualLookupShowing, showManualLookup] = useState(false)
  const [vinLookupShowing, showVinLookup] = useState(false)
  const [yearMakeModelLookupShowing, showYearMakeModelLookup] = useState(false)
  const [vehiclesEditing, changeVehicleEditStatus] = useState({})
  // eslint-disable-next-line
  const {user, updateUserState} = useContext(UserContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let transform = {}
    props.vehicles.forEach(vehicle => {
      transform[vehicle._id] = false 
    })
    // console.log(transform)
    // component mounting, initializing state for whether each individual vehicle is being edited or not
    if (Object.keys(vehiclesEditing).length === 0) changeVehicleEditStatus({...transform})
  })
  
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

    // console.log('Save New Vehicle in VehicleSettings. Adding vehicle:')
    // console.dir(vehicle)
    const newLogVehicleArrays = await addVehicle(vehicle)
    console.log('returned to saveNewVehicle in VehicleSettings')
    console.log(newLogVehicleArrays)
    const newUser = {...user, log: newLogVehicleArrays.log, vehicles: newLogVehicleArrays.vehicles}
    await updateUserState({ ...newUser })
    showVehicleLookups(false)
    setLoading(false)  
  }

  const saveVehicleChanges = async vehicle => {
    if (!vehicle || !vehicle.id) return new Error('Unable to locate vehicle ID. Please try again.')
    setLoading(true)
    // ensure even optional properties are sent to the server/db
    vehicle.make = vehicle.make || ''
    vehicle.model = vehicle.model || ''
    vehicle.odometer = vehicle.odometer || 0
    vehicle.vin = vehicle.vin || ''
    vehicle.year = vehicle.year || ''
    vehicle.primary = vehicle.primary || false

    const updates = await updateVehicle(vehicle)
    console.log(updates)
    setLoading(false)
  }

  const deleteVehicle = async vehicleId => {
    if (!vehicleId) return new Error('Unable to locate vehicle ID. Please try again.')
    console.log('Deleting vehicle: '+vehicleId)
  }

  if (loading) return <Loading message="Loading Vehicle settings..." />

  return (
    <div className="card">
      <h3>{`Vehicle${(props.vehicles && props.vehicles.length) > 1 ? "s": ""}`}</h3>
      { (props.vehicles && props.vehicles.length > 0) && props.vehicles.map(vehicle => {
          return (
            <div key={vehicle._id} className={`${vehicle.primary ? 'vehicle__container padded primary' : 'vehicle__container padded'}`} >
              <div className="well vehicle__data__container">
                <span>{vehicle.year}</span>
                <span>{vehicle.make}</span>
                <span>{vehicle.model}</span>
                { vehicle.primary && <span className="flexy">Main <input type="checkbox" checked disabled /></span> }
                <div>
                  <button 
                    className={vehiclesEditing[vehicle._id] ? `button warn` : `button`} 
                    onClick={() => changeVehicleEditStatus({ ...vehiclesEditing, [vehicle._id]: !vehiclesEditing[vehicle._id] }) } >
                      { vehiclesEditing[vehicle._id] ? `Cancel Changes` : `Edit` }
                  </button>
                  { vehiclesEditing[vehicle._id] && 
                  <>
                    <VLManual {...vehicle} saveNewVehicle={saveNewVehicle} saveVehicleChanges={saveVehicleChanges} editing={true} /> 
                    <button className="button delete delete__vehicle" onClick={() => deleteVehicle(vehicle._id)}>Permanently Delete Vehicle</button>
                  </>
                  }
                </div>
              </div>
            </div>
          )
        }) 
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
              { manualLookupShowing && <VLManual saveNewVehicle={saveNewVehicle} saveVehicleChanges={saveVehicleChanges} /> }
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