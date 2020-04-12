import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'
const axios = require('axios')

class ForgotPassword extends Component {
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
      },
      loading: false,
    }
  }

  handleInputChange = event => {
    const { value, name } = event.target
    this.setState({
      [name]: value
    })
  }

  apiForgot = event => {
    event.preventDefault()
    const { email } = this.state
    console.log(`/apiForgot handler: ${email}`)
    // TODO - create back end route and handler
  }

  render() {
    return (
      <form className="card" onSubmit={this.apiForgot} method="POST">
        <h2>I forgot my password!</h2>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
        <input className="button" type="submit" value="Send a Reset" />
        <button className="button forgot__password__button" onClick={this.props.toggleForgotPassword}>Hide Forgot Password Input</button> 
      </form>
    )
  }
}

ForgotPassword.propTypes = {
  toggleForgotPassword: PropTypes.func.isRequired
}

export default ForgotPassword
