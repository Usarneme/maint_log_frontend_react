import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'

function ProtectedRoute({ component: Component, ...rest }) {
  const { user, updateUserState } = useContext(UserContext)
  let isLoggedIn = false
  if (user && Object.keys(user).length > 0 && user.cookies && user.cookies.length > 0) isLoggedIn = true

  if (!isLoggedIn) return <Redirect to='/welcome' />

  return (
    <Route {...rest} render={props => (
      <Component {...props} user={user} updateUserState={updateUserState} />
    )} />
  )
}

export default ProtectedRoute