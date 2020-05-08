import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../contexts/userContext'
import Login from '../components/account/Login'
import Register from '../components/account/Register'

import '../styles/guestHome.css'

function GuestHome(props) {
  const {user, updateUserState} = useContext(userContext)
  const [theme, changeTheme] = useState('dark')
  
  useEffect(() => {
    const preferredTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.className = preferredTheme
    changeTheme(preferredTheme)
  }, [])

  return (
    <div className="inner">
      <Login user={user} updateUserState={updateUserState} history={props.history} />
      <Register user={user} updateUserState={updateUserState} history={props.history} />
    </div>
  )
}

export default GuestHome