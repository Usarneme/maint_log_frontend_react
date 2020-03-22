import React from 'react'
import axios from 'axios'

class AddLogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: {
        userID: '',
        username: '',
        sessionID: '',
        cookies: ''
      }
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiAddLog = async (event) => {
    event.preventDefault()
    console.log(`adding a new log entry via API...`)
    return
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

  render() {
    return (
      <form className="card form" id="logForm" onSubmit={this.apiAddLog} method="POST" encType="multipart/form-data" multiple="multiple">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
        <label htmlFor="vehicle">Vehicle</label>
        <select id="vehicle" name="vehicle">
            <option value="5e4cee3fd2ebbc8f5e62f214">1989 Chevrolet G-Series (G20)</option>
            <option value="none">None</option>
        </select>
        <label htmlFor="dateStarted">Date Started</label>
        <input type="date" name="dateStarted" />
        <label htmlFor="dateCompleted">Date Completed</label>
        <input type="date" name="dateCompleted" />
        <label htmlFor="dateDue">On what date will this item need to be completed next?</label>
        <input type="date" name="dateDue" />
        <label htmlFor="mileageDue">At what mileage will this item need to be completed next?</label>
        <input type="number" name="mileageDue" min="0" step="1" />
        <label htmlFor="shortDescription">Short Description</label>
        <textarea name="shortDescription" autoComplete="on" spellCheck="true"></textarea>
        <label htmlFor="longDescription">Long Description</label>
        <textarea name="longDescription" autoComplete="on" spellCheck="true"></textarea>
        <label htmlFor="tools">Tools</label>
        <input type="text" name="tools" value="" />
        <label htmlFor="parts">Parts</label>
        <input type="text" name="parts" value="" />
        <label htmlFor="partsCost">Cost of Parts</label>
          <span className="moneySign">$
            <input className="moneyInput" type="number" name="partsCost" min="0" step="0.01" />
          </span>
        <label htmlFor="laborCost">Cost of Labor</label>
        <span className="moneySign">$
          <input className="moneyInput" type="text" name="laborCost" min="0" step="0.01" />
        </span>
        <label htmlFor="serviceLocation">Service Location (Name and Address of Mechanic or Self)</label>
        <input type="text" name="serviceLocation" />
        <label htmlFor="odometer">Odometer</label>
        <input type="number" name="odometer" min="0" />

        <label htmlFor="photos">Upload other images
          <input type="file" name="photos" id="photos" accept="image/gif, image/png, image/jpeg" />
        </label>
        <input className="button submit" type="submit" value="Save to Log" />
    </form>
    )
  }
}

export default AddLogForm