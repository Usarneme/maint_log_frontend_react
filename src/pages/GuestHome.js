import React, { useState, useEffect, useContext } from 'react'
import { ReactSVG } from 'react-svg'

import { userContext } from '../contexts/userContext'
import Login from '../components/account/Login'
import Register from '../components/account/Register'
import LoginIcon from '../images/login.svg'
import RegisterIcon from '../images/register.svg'
import '../styles/guestHome.css'

function GuestHome(props) {
  const [loginShowing, toggleLoginShowing] = useState(true)
  const {user, updateUserState} = useContext(userContext)
  const [theme, changeTheme] = useState('dark')
  
  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.className = preferredTheme
    changeTheme(preferredTheme)
  }, [])

  return (
    <div className="inner">
      <div className="card guest__options">
        <button className={`button guest__option login ${loginShowing ? 'guest__option__active' : ''}`} onClick={() => toggleLoginShowing(true)}>
          <h4>Login & View Your Maintenance Log</h4>
          <ReactSVG src={LoginIcon} role="img" aria-label="Login Icon" fallback={() => <img src={LoginIcon} alt="login" description="login icon" className="svg" />} /> 
        </button>
        <button className={`button guest__option register ${loginShowing ? '' : 'guest__option__active'}`} onClick={() => toggleLoginShowing(false)}>
          <h4>Register & Start Your Maintenance Log</h4>
          <ReactSVG src={RegisterIcon} role="img" aria-label="Register Icon" fallback={() => <img src={RegisterIcon} alt="register" description="register icon" className="svg" />} /> 
        </button>
      </div>

      { !loginShowing && <Register user={user} updateUserState={updateUserState} history={props.history} /> }
      { loginShowing && <Login user={user} updateUserState={updateUserState} history={props.history} /> }
    </div>
  )
}

export default GuestHome