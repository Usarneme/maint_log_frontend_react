import React from 'react'

function VLVin(props) {
  return (
    <div className="form searchByVinDiv">
      <div className="vinSearchInput">
          <label htmlFor="vin">VIN</label>
          <input type="text" name="vin" />
          <button className="button" id="vinSearchButton">Lookup VIN</button>
      </div>
      <div className="vehicleResults"></div>
      <button className="button hidden" id="confirmVinResults">Vehicle Info Is Correct</button>
    </div>
  )
}

export default VLVin