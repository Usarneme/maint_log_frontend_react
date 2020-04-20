import React, { useState, useEffect } from 'react'
import { ReactSVG } from 'react-svg'

import Login from '../components/Login'
import Register from '../components/Register'
import LoginIcon from '../images/login.svg'
import RegisterIcon from '../images/register.svg'
import '../styles/guestHome.css'

function GuestHome() {
  const [loginShowing, toggleLoginShowing] = useState(true)

  const [theme, changeTheme] = useState('dark')
  
  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.className = preferredTheme
    changeTheme(preferredTheme)
  })

  return (
    <div className="inner">
      <div className="card guest__options">
        <div className={`button guest__option login ${loginShowing ? 'guest__option__active' : ''}`} onClick={toggleLoginShowing}>
          <h4>Login & View Your Maintenance Log</h4>
          <ReactSVG src={LoginIcon} role="img" aria-label="Login Icon" fallback={() => <img src={LoginIcon} alt="login" description="login icon" className="svg" />} /> 
        </div>
        <div className={`button guest__option register ${loginShowing ? '' : 'guest__option__active'}`} onClick={toggleLoginShowing}>
          <h4>Register & Start Your Maintenance Log</h4>
          <ReactSVG src={RegisterIcon} role="img" aria-label="Register Icon" fallback={() => <img src={RegisterIcon} alt="register" description="register icon" className="svg" />} /> 
        </div>
      </div>

      { !loginShowing && <Register /> }
      { loginShowing && <Login /> }
    </div>
  )
}

export default GuestHome