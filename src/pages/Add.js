import React from 'react'
import { Redirect } from 'react-router-dom'

import AddLogForm from '../components/AddLogForm'

function Add(props) {
  const isLoggedIn = (props.user.cookies.length > 0)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  return (
    <AddLogForm />
  )
}

export default Add