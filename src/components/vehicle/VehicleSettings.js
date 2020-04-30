import React, { useState } from 'react'
import PropTypes from 'prop-types'

import VLVin from './VLVin'
import VLManual from './VLManual'
import VLYMM from './VLYMM'

function VehicleSettings(props) {
  const [manualLookupShowing, showManualLookup] = useState(true)
  const [vinLookupShowing, showVinLookup] = useState(false)
  const [yearMakeModelLookupShowing, showYearMakeModelLookup] = useState(false)

  function vehicleLookupChanger(view) {
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
      <h3>Vehicle</h3>
      <div className="current__vehicle__container">
        { props.currentlySelectedVehicle && Object.keys(props.currentlySelectedVehicle).length > 0 && <>
          <h4><strong>Current Vehicle: </strong></h4>
          <div className="current__vehicle">
            { props.currentlySelectedVehicle && 
              <>
                <span>{props.currentlySelectedVehicle.year}</span>
                <span>{props.currentlySelectedVehicle.make}</span>
                <span>{props.currentlySelectedVehicle.model}</span>
              </> 
            }
            { Object.keys(props.currentlySelectedVehicle).length === 0 && <span>(none)</span> }
          </div>
        </> }
      </div>
      
      <div className="buttons__holder">
        <span>Find Vehicle By:</span>
        <button className={`lookup__button ${yearMakeModelLookupShowing ? 'lookup__selected' : ''}`} onClick={() => vehicleLookupChanger('showYearMakeModelLookup')}>Make &amp; Model</button>
        <button className={`lookup__button ${vinLookupShowing ? 'lookup__selected' : ''}`} onClick={() => vehicleLookupChanger('showVinLookup')}>VIN</button>
        <button className={`lookup__button ${manualLookupShowing ? 'lookup__selected' : ''}`} onClick={() => vehicleLookupChanger('showManualLookup')}>Manually Enter</button>
      </div>
      <div className="lookupSwitcher">
        { vinLookupShowing && <VLVin currentVehicle={props.currentlySelectedVehicle} saveVehicle={props.saveVehicle} /> }
        { manualLookupShowing && <VLManual currentVehicle={props.currentlySelectedVehicle} saveVehicle={props.saveVehicle} /> }
        { yearMakeModelLookupShowing && <VLYMM currentVehicle={props.currentlySelectedVehicle} saveVehicle={props.saveVehicle} /> }
      </div>
    </div>
  )
}

VehicleSettings.propTypes = {
  currentlySelectedVehicle: PropTypes.object,
  saveVehicle: PropTypes.func.isRequired
}

export default VehicleSettings