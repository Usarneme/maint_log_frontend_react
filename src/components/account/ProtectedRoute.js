import React, { useContext, Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { userContext } from '../../contexts/userContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, updateUserState } = useContext(userContext)
  let isLoggedIn = false

  if (!user) isLoggedIn = false
  if (Object.keys(user).length === 0) isLoggedIn = false
  if (!user.cookies) isLoggedIn = false
  if (!user.email) isLoggedIn = false
  if (!user.name) isLoggedIn = false
  if (!user.sessionID) isLoggedIn = false
  if (!user.userID) isLoggedIn = false

  if (user && user.cookies && user.cookies.length > 0) isLoggedIn = true
  // console.log('Protected Route...Logged in: '+isLoggedIn)
  // console.log(user)
  if (!isLoggedIn) return <Redirect to='/welcome' />

  return (
    <Route {...rest} render={props => (
      <Component {...props} user={user} updateUserState={updateUserState} />
    )} />
  )}

export default ProtectedRoute