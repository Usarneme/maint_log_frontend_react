import React from 'react'

class VLManual extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: props.year || '',
      make: props.make || '',
      model: props.model || '',
      vin: props.vin || '',
      odometer: props.odometer || ''
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }

  saveVehicle = () => {
    this.props.saveVehicle(this.state)
  }

  render() {
    if (!this.props.display) return null

    return (
      <div className="form manualVehicleEntryDiv">
        <label htmlFor="year">Year</label>
        <input type="number" name="year" min="1900" step="1" value={this.state.year} onChange={this.handleChange} />
        <label htmlFor="make">Make </label>
        <input type="text" name="make" value={this.state.make} onChange={this.handleChange} />
        <label htmlFor="model">Model </label>
        <input type="text" name="model" value={this.state.model} onChange={this.handleChange} />
        <label htmlFor="odometer">Latest Odometer Reading</label>
        <input type="number" name="odometer" min="0" step="0.1" value={this.state.odometer} onChange={this.handleChange} />
        <label htmlFor="vin">VIN</label>
        <input type="text" name="vin" value={this.state.vin} onChange={this.handleChange} />
        <button className="button" onClick={this.saveVehicle}>Vehicle Info Is Correct</button>
      </div>
    )
  }
}

export default VLManual