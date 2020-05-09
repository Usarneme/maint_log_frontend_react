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
      <h2>Welcome!</h2>
      <div className="welcome__guest__container">
        <section>
          <h3 className="welcome__guest__hero">Keep track of the service history of your vehicles.</h3>
          <ul>
            <li>Record what was done, when, by whom, and where.</li>
            <li>Include photos of before and after the service, parts used, and receipts.</li>
            <li>Write short and long descriptions of work done.</li>
            <li>Recurring services (such as oil and filter changes) can be scheduled with a future due date or mileage.</li>
          </ul>
        </section>
        <p><strong>Returning user? </strong>Please login to access your log.</p>
        <Login user={user} updateUserState={updateUserState} history={props.history} />
        <p><strong>New user? </strong>Please register an account to start tracking your vehicle's services.</p>
        <Register user={user} updateUserState={updateUserState} history={props.history} />
      </div> 
    </div>
  )
}

export default GuestHome