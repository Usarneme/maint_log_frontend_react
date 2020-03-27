import React from 'react'
import axios from 'axios'

class LogForm extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      id: '', 
      shortDescription: '', 
      longDescription: '', 
      dateStarted: '', 
      dateCompleted: '', 
      dateEntered: '', 
      dateDue: '', 
      file: '',
      mileageDue: '', 
      name: '', 
      odometer: '', 
      tools: '', 
      parts: '', 
      partsCost: '', 
      laborCost: '', 
      serviceLocation: '', 
      photos: '', 
      receipts: '',
      vehicle: '',
      api: true
    }
  }

  handleInputChange = (event) => {
    // when a file is selected for upload...
    if (event.target.files) return this.setState({ file: event.target.files[0] })
    // otherwise track changes in form data to state
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiEditLog = async (event) => {
    event.preventDefault()
    let url = ''
    // can post new and edit existing log entries via this form
    if (this.props && this.props.log) {
      url = `${process.env.REACT_APP_API_DOMAIN}/add/${this.props.log.id}`
    } else {
      url = `${process.env.REACT_APP_API_DOMAIN}/add/`
    }

    let formData = new FormData()
    formData.append('id', this.state.id) 
    formData.append('shortDescription', this.state.shortDescription) 
    formData.append('longDescription', this.state.longDescription) 
    formData.append('dateStarted', this.state.dateStarted) 
    formData.append('dateCompleted', this.state.dateCompleted) 
    formData.append('dateEntered', this.state.dateEntered) 
    formData.append('dateDue', this.state.dateDue) 
    formData.append('file', this.state.file)
    formData.append('mileageDue', this.state.mileageDue) 
    formData.append('name', this.state.name) 
    formData.append('odometer', this.state.odometer) 
    formData.append('tools', this.state.tools) 
    formData.append('parts', this.state.parts) 
    formData.append('partsCost', this.state.partsCost) 
    formData.append('laborCost', this.state.laborCost) 
    formData.append('serviceLocation', this.state.serviceLocation) 
    formData.append('photos', this.state.photos) 
    formData.append('receipts', this.state.receipts)
    formData.append('vehicle', this.state.vehicle)
    formData.append('api', this.state.api)

    console.log(`Posting to ${url}.`)
    try {
      const result = await axios.post(url, formData)
      console.log(`Returned successfully!`)
      // console.dir(result)

      if (result.status === 200) {
        const { log } = result.data
        // console.log('Updated log returned:')
        // console.dir(log)
        const user = this.props.user
        user.log = log

        this.props.updateUserState(user)
        console.log('updateUserState complete')

        // TODO redirect or flash some error/success message
        // this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+result.status)
        const error = new Error(result.error)
        throw error
      }
    } catch(error) {
      console.log('Error with LogForm')
      console.dir(error)
      alert(error)
      // TODO redirect? try again?
    }
  }

  componentDidMount() {
    if (!this.props) return
    if (!this.props.log) return

    console.log('Editing extant Log entry. Initializing state. ')
    this.setState({
      id: this.props.log.id, 
      shortDescription: this.props.log.shortDescription, 
      longDescription: this.props.log.longDescription, 
      dateStarted: this.props.log.dateStarted || '', 
      dateCompleted: this.props.log.dateCompleted || '', 
      dateEntered: this.props.log.dateEntered || '', 
      dateDue: this.props.log.dateDue || '', 
      mileageDue: this.props.log.mileageDue || '', 
      name: this.props.log.name, 
      odometer: this.props.log.odometer, 
      tools: this.props.log.tools, 
      parts: this.props.log.parts, 
      partsCost: this.props.log.partsCost, 
      laborCost: this.props.log.laborCost, 
      serviceLocation: this.props.log.serviceLocation, 
      photos: this.props.log.photos, 
      receipts: this.props.log.receipts,
      vehicle: this.props.log.vehicle 
    })
  }

  render() {
    // if (true) return <p>{JSON.stringify(this.state)}</p> 

    return (
      <div className="inner">
        <h2>
          {this.state.id ? 
            `Edit Log - ${this.state.name.length > 120 ? `${this.state.name.substring(0,120)}...` : this.state.name}`
            :
            `Add New Log Entry`}
        </h2>
        <form className="card form" id="logForm" onSubmit={this.apiEditLog} method="POST" encType="multipart/form-data" multiple="multiple">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          <label htmlFor="vehicle">Vehicle</label>
          <select id="vehicle" name="vehicle" onChange={this.handleInputChange}>
              <option value="5e4cee3fd2ebbc8f5e62f214">1989 Chevrolet G-Series (G20)</option>
              <option value="none">None</option>
          </select>
          <label htmlFor="dateStarted">Date Started</label>
          <input type="date" name="dateStarted" value={this.state.dateStarted} onChange={this.handleInputChange} />
          <label htmlFor="dateCompleted">Date Completed</label>
          <input type="date" name="dateCompleted" value={this.state.dateCompleted} onChange={this.handleInputChange} />
          <label htmlFor="dateDue">On what date will this item need to be completed next?</label>
          <input type="date" name="dateDue" value={this.state.dateDue} onChange={this.handleInputChange} />
          <label htmlFor="mileageDue">At what mileage will this item need to be completed next?</label>
          <input type="number" name="mileageDue" min="0" step="1" value={this.state.mileageDue} onChange={this.handleInputChange} />
          <label htmlFor="shortDescription">Short Description</label>
          <textarea name="shortDescription" autoComplete="on" spellCheck="true" value={this.state.shortDescription} onChange={this.handleInputChange} ></textarea>
          <label htmlFor="longDescription">Long Description</label>
          <textarea name="longDescription" autoComplete="on" spellCheck="true" value={this.state.longDescription} onChange={this.handleInputChange} ></textarea>
          <label htmlFor="tools">Tools</label>
          <input type="text" name="tools" value={this.state.tools} onChange={this.handleInputChange} />
          <label htmlFor="parts">Parts</label>
          <input type="text" name="parts" value={this.state.parts} onChange={this.handleInputChange} />
          <label htmlFor="partsCost">Cost of Parts</label>
            <span className="moneySign">$
              <input className="moneyInput" type="number" name="partsCost" min="0" step="0.01" value={this.state.partsCost} onChange={this.handleInputChange} />
            </span>
          <label htmlFor="laborCost">Cost of Labor</label>
          <span className="moneySign">$
            <input className="moneyInput" type="text" name="laborCost" min="0" step="0.01" value={this.state.laborCost} onChange={this.handleInputChange} />
          </span>
          <label htmlFor="serviceLocation">Service Location (Name and Address of Mechanic or Self)</label>
          <input type="text" name="serviceLocation" value={this.state.serviceLocation} onChange={this.handleInputChange} />
          <label htmlFor="odometer">Odometer</label>
          <input type="number" name="odometer" min="0" value={this.state.odometer} onChange={this.handleInputChange} />

          <label htmlFor="file">Upload other images
            <input type="file" name="file" accept="image/gif, image/png, image/jpeg" onChange={this.handleInputChange} />
          </label>
          <input className="button submit" type="submit" value="Save Log Changes" />
        </form>
      </div>
    )
  }
}

export default LogForm