import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import UserContext from '../../contexts/UserContext'

function ProtectedRoute(props) {
  const { user, updateUserState } = useContext(UserContext)
  let isLoggedIn = false
  if (user && Object.keys(user).length > 0 && user.cookies && user.cookies.length > 0) isLoggedIn = true

  if (!isLoggedIn) return <Redirect to='/welcome' />
  console.log(props)
  return (
    <Route {...props}>{props.children}</Route>
  )

  // OLD PROTECT ROUTE COMPONENT:
  // Error message: You should not use <Route component> and <Route children> in the same route; <Route children> will be ignored
  // Rewriting to the above removes this warning and simplifies some rendering decisions made by React
  // return (
  //   <Route {...rest} render={props => (
  //     <Component {...props} user={user} updateUserState={updateUserState} />
  //   )} />
  // )
}

export default ProtectedRoute