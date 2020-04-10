import React from 'react'
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
          <div className={`guest__option login ${this.state.showLogin ? 'guest__option__active' : ''}`} onClick={() => this.showLogin()}>
            <img src={LoginIcon} alt="login" description="login icon" className="svg button" />
            <h4>Login & View Your Maintenance Log</h4>
          </div>
          <div><span>-or-</span></div>
          <div className={`guest__option register ${this.state.showLogin ? '' : 'guest__option__active'}`} onClick={() => this.showRegister()}>
            <h4>Register & Start Your Maintenance Log</h4>
            <img src={RegisterIcon} alt="register" description="register icon" className="svg button" />
          </div>
        </div>
        { !this.state.showLogin && 
          <div>
            <Register user={this.props.user} updateUserState={this.props.updateUserState} history={this.props.history} />
          </div>
        }
        { this.state.showLogin &&
          <div>
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