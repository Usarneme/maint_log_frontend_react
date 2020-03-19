import React, { Component } from 'react'

const axios = require('axios')
axios.defaults.withCredentials = true

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      auth: {
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

  apiLogin = (event) => {
    event.preventDefault()
    console.log(`/apiLogin handler. Axios posting to ${process.env.REACT_APP_API_DOMAIN}/api/login`)

    const { email, password } = this.state
    axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/login`, { email, password })
    .then(res => {
      if (res.status === 200) {
        console.log(`apiLogin handler returned success!`)
        // console.dir(res)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const username = user.name
        this.setState({ auth: { username, userID, sessionID, cookies, email }, password: '' })
        this.props.updateAuthState(this.state.auth)
        this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+res.status)
        const error = new Error(res.error)
        throw error
      }
    })
    .catch(err => {
      console.log('Error posting to /api/login.')
      // console.log(err)
      // console.log(Object.keys(err))
      console.log(err.message)
      // console.log(err.config.validateStatus())
      // console.log(err.request)
      // console.log(err.response)
      // console.log(err.isAxiosError)
      console.dir(err.toJSON())
      alert('Error logging in please try again')
    })
  }

  apiForgot = (event) => {
    event.preventDefault()
    const { email } = this.state
    console.log(`/apiForgot handler: ${email}`)
    // TODO - create back end route and handler
  }

  render() {
    return (
      <div className="inner">
        <form className="form" onSubmit={this.apiLogin} method="POST">
          <h2>Login</h2>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Log In →" />
        </form>

        <form className="form" onSubmit={this.apiForgot} method="POST">
          <h2>I forgot my password!</h2>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Send a Reset" />
        </form>
      </div>
    )
  }
}

export default Login
