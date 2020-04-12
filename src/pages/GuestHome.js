import React from 'react'
import { ReactSVG } from 'react-svg'
import PropTypes from 'prop-types'
import Login from '../components/Login'
import Register from '../components/Register'

import LoginIcon from '../images/login.svg'
import RegisterIcon from '../images/register.svg'

import '../styles/guestHome.css'

class GuestHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogin: true
    }
  }

  showLogin() {
    this.setState({ showLogin: true })
  }

  showRegister() {
    this.setState({ showLogin: false })
  }

  render() {
    return (
      <div className="inner">
        <div className="guest__options">
          <div className={`button guest__option login ${this.state.showLogin ? 'guest__option__active' : ''}`} onClick={() => this.showLogin()}>
            <h4>Login & View Your Maintenance Log</h4>
            <ReactSVG src={LoginIcon} role="img" aria-label="Login Icon" fallback={() => <img src={LoginIcon} alt="login" description="login icon" className="svg" />} /> 
          </div>
          <div className={`button guest__option register ${this.state.showLogin ? '' : 'guest__option__active'}`} onClick={() => this.showRegister()}>
            <h4>Register & Start Your Maintenance Log</h4>
            <ReactSVG src={RegisterIcon} role="img" aria-label="Register Icon" fallback={() => <img src={RegisterIcon} alt="register" description="register icon" className="svg" />} /> 
          </div>
        </div>
        { !this.state.showLogin && 
          <div className={this.state.showLogin ? 'hidden' : ''}>
            <Register user={this.props.user} updateUserState={this.props.updateUserState} history={this.props.history} />
          </div>
        }
        { this.state.showLogin &&
          <div className={this.state.showLogin ? '' : 'hidden'}>
          <Login user={this.props.user} updateUserState={this.props.updateUserState} history={this.props.history} />
          </div>
        }
      </div>
    )
  }
}

GuestHome.propTypes = {
  user: PropTypes.object,
  updateUserState: PropTypes.func,
  history: PropTypes.object
}

export default GuestHome