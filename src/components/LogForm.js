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
      mileageDue: '', 
      name: '', 
      odometer: '', 
      tools: '', 
      parts: '', 
      partsCost: '', 
      laborCost: '', 
      serviceLocation: '', 
      photos: '', 
      receipts: ''
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiLogin = async (event) => {
    event.preventDefault()
    const { email, password } = this.state
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/login`, { email, password })
      if (res.status === 200) {
        // console.log(`apiLogin handler returned success!`)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const username = user.name
        // const logDataResult = await getLogData()
        // const logData = logDataResult.data
        // const { vehicle, log } = logData
        // this.setState({ user: { username, userID, sessionID, cookies, email, vehicle, log }, password: '' })
        // this.props.updateUserState(this.state.user)

        // this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+res.status)
        const error = new Error(res.error)
        throw error
      }
    } catch(err) {
        console.log('Error posting to /api/login.')
        console.dir(err)
        alert('Error logging in please try again')
      }
  }

  apiEditLog = async (event) => {
    return true
  }

  componentDidMount() {
    console.log('Mounting LogForm...')
    if (!this.props) return
    if (!this.props.log) return

    console.log('Editing extant Log entry. Initializing state. ')
    this.setState({
      id: this.props.log.id, 
      shortDescription: this.props.log.shortDescription, 
      longDescription: this.props.log.longDescription, 
      dateStarted: this.props.log.dateStarted, 
      dateCompleted: this.props.log.dateCompleted, 
      dateEntered: this.props.log.dateEntered, 
      dateDue: this.props.log.dateDue, 
      mileageDue: this.props.log.mileageDue, 
      name: this.props.log.name, 
      odometer: this.props.log.odometer, 
      tools: this.props.log.tools, 
      parts: this.props.log.parts, 
      partsCost: this.props.log.partsCost, 
      laborCost: this.props.log.laborCost, 
      serviceLocation: this.props.log.serviceLocation, 
      photos: this.props.log.photos, 
      receipts: this.props.log.receipts,   
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
          <select id="vehicle" name="vehicle">
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

          <label htmlFor="photos">Upload other images
            <input type="file" name="photos" id="photos" accept="image/gif, image/png, image/jpeg" />
          </label>
          <input className="button submit" type="submit" value="Save Log Changes" />
        </form>
      </div>
    )
  }
}

export default LogForm