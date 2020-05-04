import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

import Loading from '../Loading'
import PhotoEditor from '../PhotoEditor' 

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
      vehicle: props.user.currentlySelectedVehicle || '',
      showDeleteButton: false,
      loading: true
    }
  }

  handleInputChange = event => {
    // when a file is selected for upload...
    if (event.target.files) return this.setState({ file: event.target.files[0] })
    // otherwise track changes in form data to state
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiEditLog = async event => {
    event.preventDefault()
    this.setState({ loading: true })
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
    formData.append('dateEntered', moment(Date.now()).format('YYYY-MM-DD')) 
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
    formData.append('previousPhotos', this.state.photos) 
    formData.append('photos', this.state.photos) 
    formData.append('receipts', this.state.receipts)
    formData.append('vehicle', this.state.vehicle)
    formData.append('api', true)

    try {
      const result = await axios.post(url, formData)
      if (result.status === 200) {
        const log = result.data.fullLog
        const newLogEntry = result.data.newLogEntry
        const user = this.props.user
        user.log = log
        this.props.updateUserState(user)
        this.props.history.push(`/log/${newLogEntry.slug}`)
      } else {
        console.log('Response received but with status code: '+result.status)
        const error = new Error(result.error)
        throw error
      }
    } catch(error) {
      console.log('Error with LogForm')
      console.dir(error)
      this.setState({ loading: false })
      alert(error)
      // TODO redirect? try again?
    }
  }

  toggleDeleteButton = async () => {
    this.setState({ showDeleteButton: !this.state.showDeleteButton })
  }

  deleteLogEntry = async event => {
    event.preventDefault()
    try {
      const result = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/delete/log/entry/${this.state.id}`)
      if (result.data === null) {
        console.log('Server unable to find specified log entry. Was it already deleted?')
      } else if (result.status === 200) {
        // update State to remove the deleted entry
        const updatedLog = this.props.user.log.filter(entry => entry.id !== this.state.id)
        const user = this.props.user
        user.log = updatedLog
        this.props.updateUserState(user)
        // redirect back to the log page
        this.props.history.push('/log')
      }
    } catch(err) {
      console.error(err)
    }
  }

  deletePhoto = async event => {
    event.preventDefault()
    // pathname has a leading slash: /api/remove/photo/name.filetype
    // console.log('Deleting photo: '+event.target.pathname)
    const url = `${process.env.REACT_APP_API_DOMAIN}${event.target.pathname}`
    try {
      const result = await axios.post(url)
      if (result.data === null) {
        console.log('Server unable to find specified photo to delete. Was it already deleted?')
      } else if (result.status === 200) {
        // update State to remove the deleted entry
        const user = this.props.user
        user.log = result.data
        this.props.updateUserState(user)
        this.props.history.push(`/log/${this.props.log.id}/edit`)
      }
    } catch(err) {
      console.error(err)
    }
  }

  componentDidMount() {
    if (!this.props) return this.setState({ loading: false })
    if (!this.props.log) return this.setState({ loading: false })

    // console.log('Editing extant Log entry. Initializing state. ')
    let dateStarted = ''
    let dateCompleted = ''
    let dateEntered = ''
    let dateDue = ''
    // convert mongodb timestamp to something usable by an html input of type=date, 
    // eg: 2018-01-30T00:00:00.000Z => 2018-01-30
    if (this.props.log.dateStarted) dateStarted = moment(this.props.log.dateStarted).format('YYYY-MM-DD')
    if (this.props.log.dateCompleted) dateCompleted = moment(this.props.log.dateCompleted).format('YYYY-MM-DD')
    if (this.props.log.dateEntered) dateEntered = moment(this.props.log.dateEntered).format('YYYY-MM-DD')
    if (this.props.log.dateDue) dateDue = moment(this.props.log.dateDue).format('YYYY-MM-DD')

    this.setState({
      id: this.props.log.id, 
      shortDescription: this.props.log.shortDescription, 
      longDescription: this.props.log.longDescription, 
      dateStarted: dateStarted, 
      dateCompleted: dateCompleted, 
      dateEntered: dateEntered, 
      dateDue: dateDue, 
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
      vehicle: this.props.log.vehicle,
      loading: false
    })
  }

  alignViewToElement = event => {
    event.preventDefault()
    event.target.scrollIntoView({block: "center", inline: "nearest", behavior: "smooth" })
  }

  render() {
    if (this.state.loading) return <Loading message="Formatting and Saving Log Data..." />

    if (!this.state.vehicle) {
      return (
        <div className="inner">
          <div className="card no__vehicle warning">
            <h3>No Vehicle Associated With This Account</h3>
            <p>Before entering a service record, please: </p>
            <Link to="/settings" className="button">Click Here To Add A Vehicle To Your Account</Link>
          </div>
        </div>
      )
    } else {
      return (
        <div className="inner">
          <form className="card form" id="logForm" onSubmit={this.apiEditLog} method="POST" encType="multipart/form-data" multiple="multiple">
            <h3>
              {this.state.id ? 
                <>
                  <Link to={`/log/${this.props.log.slug}`}> 
                    {this.state.name.length > 120 ? `${this.state.name.substring(0,120)}... ` : `${this.state.name} ` }
                  </Link>
                  <span> > Edit</span>
                </>
                :
                `Add New Log Entry`}
            </h3>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" autoFocus value={this.state.name} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="vehicle">Vehicle</label>
            <select id="vehicle" name="vehicle" required="required" defaultValue={this.props && this.props.log && this.props.log.vehicle ? this.props.log.vehicle : 'Vehicle Required'} onChange={this.handleInputChange} onFocus={this.alignViewToElement}>
              { this.props.user.vehicle && this.props.user.vehicle.length > 0 &&
                this.props.user.vehicle.map(model => <option key={model._id} value={model._id}>{`${model.year} ${model.make} ${model.model}`}</option>)
              }
            </select>
            <label htmlFor="dateStarted">Date Started</label>
            <input type="date" name="dateStarted" value={this.state.dateStarted} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="dateCompleted">Date Completed</label>
            <input type="date" name="dateCompleted" value={this.state.dateCompleted} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="dateDue">On what date will this item need to be completed next?</label>
            <input type="date" name="dateDue" value={this.state.dateDue} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="mileageDue">At what mileage will this item need to be completed next?</label>
            <input type="number" name="mileageDue" min="0" step="1" value={this.state.mileageDue} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="shortDescription">Short Description</label>
            <textarea name="shortDescription" autoComplete="on" spellCheck="true" value={this.state.shortDescription} onChange={this.handleInputChange} onFocus={this.alignViewToElement} ></textarea>
            <label htmlFor="longDescription">Long Description</label>
            <textarea name="longDescription" autoComplete="on" spellCheck="true" value={this.state.longDescription} onChange={this.handleInputChange} onFocus={this.alignViewToElement} ></textarea>
            <label htmlFor="tools">Tools</label>
            <input type="text" name="tools" value={this.state.tools} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="parts">Parts</label>
            <input type="text" name="parts" value={this.state.parts} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="partsCost">Cost of Parts</label>
              <span className="moneySign">$
                <input className="moneyInput" type="number" name="partsCost" min="0" step="0.01" value={this.state.partsCost} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
              </span>
            <label htmlFor="laborCost">Cost of Labor</label>
            <span className="moneySign">$
              <input className="moneyInput" type="text" name="laborCost" min="0" step="0.01" value={this.state.laborCost} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            </span>
            <label htmlFor="serviceLocation">Service Location (Name and Address of Mechanic or Self)</label>
            <input type="text" name="serviceLocation" value={this.state.serviceLocation} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            <label htmlFor="odometer">Odometer</label>
            <input type="number" name="odometer" min="0" value={this.state.odometer} onChange={this.handleInputChange} onFocus={this.alignViewToElement} />

            <label htmlFor="file">Upload other images
              <input type="file" name="file" accept="image/gif, image/png, image/jpeg" onChange={this.handleInputChange} onFocus={this.alignViewToElement} />
            </label>
            <input className="button submit" type="submit" value="Save Log Changes" onFocus={this.alignViewToElement} />
          </form>

          { this.state.photos && this.state.photos.length > 0 && 
            <div className="card">
              <label htmlFor="previousPhotos"><h3>Photos:</h3></label>
              <PhotoEditor photos={this.state.photos} deletePhoto={this.deletePhoto} /> 
              <input type="hidden" name="previousPhotos" value={this.state.photos.toString()} />
            </div>
            }

          { this.state.id &&
            <>
            <button className="button delete__log__entry" onClick={this.toggleDeleteButton} title="Delete Log Entry">Delete Log Entry</button>
            { this.state.showDeleteButton &&
              <button className="button delete__log__entry__confirm" onClick={this.deleteLogEntry} title="Permanently Delete Log Entry">Permanently Delete Log Entry</button>
            }
            </>
          }
        </div>
      )
    }
  }
}

LogForm.propTypes = {
  log: PropTypes.object,
  user: PropTypes.object.isRequired,
  updateUserState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  currentlySelectedVehicle: PropTypes.object
}

export default LogForm