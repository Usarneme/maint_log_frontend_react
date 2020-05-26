import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ForgotPassword from './ForgotPassword'
import Loading from '../Loading'
import { login } from '../../helpers'
import '../../styles/login.css'

function Login(props) {
  const [state, setState] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = event => {
    const { value, name } = event.target
    setState({
      ...state,
      [name]: value
    })
  }

  const handleLogin = async event => {
    event.preventDefault()
    const { email, password } = state
    setLoading(true)
    // login func already wrapped in a try/catch. returns an error in result[response] if there is a failure
    const result = await login(email, password)
    if (!result || result.response !== undefined) {
      setLoading(false)
      return alert(`Error logging in. Please try again. Status ${result.response.status}: ${result.response.statusText}.`)
    }
    // SonarQube report edit. 
    // Previously: Object.keys(result.user) === 0. 
    // Need to add .length to the result as Object.keys returns an Array
    if (Object.keys(result.user).length === 0) {
      setLoading(false)
      return alert('Server could not locate that user. Please try again.')
    }
    console.log('Server returned user:')
    console.log(result.user)
    setLoading(false)
    props.history.push('/')
    await props.updateUserState(result.user)
  }

  if (loading) return <Loading message="Logging in..." /> 

  return (
    <div className="card">
      <h3>Login</h3>
      <form className="padded" onSubmit={handleLogin} method="POST">
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" placeholder="Enter email..." value={state.email || ''} onChange={handleInputChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Enter password..." value={state.password || ''} onChange={handleInputChange} />
        <input className="button" type="submit" value="Log In →" />
      </form>

      <ForgotPassword email={state.email || ''} /> 
    </div>
  )
}

Login.propTypes = {
  updateUserState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default Login
