import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
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

  apiRegister = async (event) => {
    event.preventDefault()
    const { username, email, password, passwordConfirm } = this.state

    if (password !== passwordConfirm) {
      alert('Your passwords do not match!')
      return
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/register`, { username, email, password })
      if (res.status === 200) {
        console.log(`apiRegister handler returned success!`)
        const { user, sessionID, cookies } = res.data
        const userID = user._id
        const username = user.name
        this.setState({ user: { username, userID, sessionID, cookies, email }, password: '', passwordConfirm: '' })
        this.props.updateUserState(this.state.user)
        this.props.history.push('/')
      } else {
        console.log('Response received but with status code: '+res.status)
        const error = new Error(res.error)
        throw error
      }
    } catch(err) {
        console.log('Error posting to /api/register.')
        console.dir(err)
        alert('Error registering new user please try again')
      }
  }

  render() {
    return (
      <div className="inner">
        <form className="card" onSubmit={this.apiRegister} method="POST">
          <h2>Register</h2>
          <label htmlFor="name">Username</label>
          <input type="text" name="name" placeholder="Enter username..." value={this.state.username} onChange={this.handleInputChange} />
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" placeholder="Enter email..." value={this.state.email} onChange={this.handleInputChange} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Enter password..." value={this.state.password} onChange={this.handleInputChange} />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input type="password" name="password-confirm" placeholder="Confirm password..." value={this.state.passwordConfirm} onChange={this.handleInputChange} />
          <input className="button" type="submit" value="Register →" />
        </form>
      </div>
    )
  }
}

export default Register
