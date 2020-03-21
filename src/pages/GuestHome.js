import React from 'react'

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
            <img src={LoginIcon} alt="login" description="login icon" className="svg" />
            <h4>Login to View Your Maintenance Log</h4>
          </div>
          <div className={`guest__option register ${this.state.showLogin ? '' : 'guest__option__active'}`} onClick={() => this.showRegister()}>
            <h4>Register to Start Your Maintenance Log</h4>
            <img src={RegisterIcon} alt="register" description="register icon" className="svg" />
          </div>
        </div>
        { !this.state.showLogin && 
          <div>
            <Register />
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

export default GuestHome