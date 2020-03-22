import React from 'react'

function VLManual(props) {
  return (
    <div className="form manualVehicleEntryDiv">
      <label htmlFor="vehicleYear">Year</label>
      <input type="number" name="vehicleYear" min="1900" step="1" value="1989" />
      <label htmlFor="vehicleMake">Make </label>
      <input type="text" name="vehicleMake" value="Chevrolet" />
      <label htmlFor="vehicleModel">Model </label>
      <input type="text" name="vehicleModel" value="G-Series (G20)" />
      <label htmlFor="vehicleOdometer">Current Odometer Reading</label>
      <input type="number" name="vehicleOdometer" min="0" step="0.1" value="219500" />
    </div>
  )
}

export default VLManual