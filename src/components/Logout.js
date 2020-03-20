import React, { useState, useEffect } from 'react'

const Logout = (props) => {
  const [hasError, setErrors] = useState(false)

  function apiLogout() {
    console.log(`apiLogout handler. POST fetching: ${process.env.REACT_APP_API_DOMAIN}/api/logout`)
    fetch(`${process.env.REACT_APP_API_DOMAIN}/api/logout`, {
      method: 'POST',
      // body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log(`apiLogout handler returned success!`)
        const userReset = { username: '', userID: '', sessionID: '', cookies: '', email: ''}
        props.updateUserState(userReset)
        return props.history.push('/')
      } else {
        const error = new Error(res.error)
        throw error
      }
    })
    .catch(err => {
      console.error(err)
      alert('Error logging out please try again')
    })
  }

  useEffect(() => {
    apiLogout()
  })

  return (
    <div className="inner loading">
      { !hasError && <p>Please wait while you are logged out...</p> }
      { hasError && `<div className="error"> ${JSON.stringify(hasError)}` }
    </div>
  )
}

export default Logout