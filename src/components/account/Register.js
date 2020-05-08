import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

import Loading from '../Loading'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      user: {
        userID: '',
        username: '',
        sessionID: '',
        cookies: '',
        log: [],
        vehicle: [],
        currentlySelectedVehicle: ''
      },
      loading: false
    }
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiRegister = async event => {
    event.preventDefault()
    this.setState({ loading: true })
    // client-side check on password fields before sending to server
    if (this.state.password !== this.state.passwordConfirm) {
      alert('Your passwords do not match!')
      return this.setState({ loading: false })
    }

    const url = `${process.env.REACT_APP_API_DOMAIN}/api/register`
    const formData = {
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password,
      "password-confirm": this.state.passwordConfirm,
      "api": true
    }

    try {
      const res = await axios.post(url, formData)
      if (res.status === 200) {
        // console.log(`apiRegister handler returned success!`)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const name = user.name
        const email = this.state.email
        const vehicle = []
        const log = []
        await this.setState({ user: { name, userID, sessionID, cookies, email, vehicle, log, currentlySelectedVehicle: vehicle[0] }, password: '', loading: false })
        this.props.updateUserState(this.state.user)
        this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+res.status)
        const error = new Error(res.error)
        throw error
      }
    } catch(err) {
        console.log('Error posting to /api/register.')
        console.log(err.response.status)
        this.setState({ loading: false })
        alert(`${err.response.data} That email address may be malformed (typo?), banned, or already in use. Please try again.`)
      }
  }

  render() {
    if (this.state.loading) return <Loading message="Registering New User..." />

    return (
      <div className="card">
        <form onSubmit={this.apiRegister} method="POST" encType="multipart/form-data" multiple="multiple">
          <h3>Register</h3>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter name..." value={this.state.name} onChange={this.handleInputChange} />
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} />
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input type="password" name="passwordConfirm" placeholder="Confirm password..." value={this.state.passwordConfirm} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Register →" />
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicle: PropTypes.array
  }),
  updateUserState: PropTypes.func.isRequired
}

export default Register
