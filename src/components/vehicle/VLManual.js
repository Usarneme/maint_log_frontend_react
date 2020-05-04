import React from 'react'
import PropTypes from 'prop-types'

class VLManual extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: props.currentVehicle.year || '',
      make: props.currentVehicle.make || '',
      model: props.currentVehicle.model || '',
      vin: props.currentVehicle.vin || '',
      odometer: props.currentVehicle.odometer || '',
      primary: props.currentVehicle.primary || false,
      id: props.currentVehicle.id || ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  togglePrimary = () => {
    const bool = !this.state.primary
    this.setState({ primary: bool })
  }

  render() {
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
        <div className="checkboxes__container">
          <label htmlFor="primaryCheckbox">Main Vehicle</label>
          <input type="checkbox" name="primaryCheckbox" checked={this.state.primary} onChange={this.togglePrimary} />
        </div>
        <button className="button" onClick={() => this.props.saveVehicleChanges(this.state)}>Vehicle Info Is Correct</button>
      </div>
    )
  }
}

VLManual.propTypes = {
  currentVehicle: PropTypes.object,
  saveVehicleChanges: PropTypes.func.isRequired
}

export default VLManual