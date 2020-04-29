import React from 'react'

import '../../styles/vlvin.css'

class VLVin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vin: '',
      resultsError: null,
      vehicle: {
        make: '',
        model: '',
        year: ''
      }
    }
  }

  handleInputChange = event => {
    this.setState({ vin: event.target.value })
  }

  vinSearch = async event => {
    event.stopPropagation()
    event.preventDefault()
    if (!this.state.vin) return
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${this.state.vin}?format=json`)
      const data = await response.json()
      const results = await data["Results"]
      // Per the NHTSA API spec (https://vpic.nhtsa.dot.gov/api/):
      const error = Number(results[4]["Value"][0])
      if (error === 0) {
        const year = results[9]["Value"]
        const rawMake = results[6]["Value"]
        const make = rawMake.charAt(0).toUpperCase() + rawMake.slice(1).toLowerCase()
        const model = results[8]["Value"]
        this.setState({ vehicle: { year, make, model }})
      } else {
        this.setState({ resultsError: `No Results Found for VIN "${this.state.vin}". Please try again.` })
      }
    } catch (err) {
      console.error(err)
    }
  }

  saveVehicle = () => {
    this.props.saveVehicle({ vin: this.state.vin, ...this.state.vehicle })
  }

  render() {
    if (!this.props.display) return null

    return (
      <div className="card searchByVinDiv">
        <div className="vinSearchInput">
          <label htmlFor="vin">VIN</label>
          <input type="text" name="vin" onChange={this.handleInputChange} />
          <button className="button" onClick={this.vinSearch}>Search For VIN</button>
        </div>
        <div className="vehicleResults">
          { this.state.resultsError && <span>{this.state.resultsError}</span> }
          { !this.state.resultsError && this.state.vehicle && this.state.vehicle.make.length > 0 &&
            <>
              <h4>Vehicle Found!</h4>
              <span>Results:</span>
              <span>{`Year: ${this.state.vehicle.year}`}</span>
              <span>{`Make: ${this.state.vehicle.make}`}</span>
              <span>{`Model: ${this.state.vehicle.model}`}</span>
              <button className="button" onClick={this.saveVehicle}>Vehicle Info Is Correct</button>
            </>          
          }
        </div>
      </div>
    )
  }
}

export default VLVin