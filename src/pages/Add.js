import React from 'react'
import { Redirect } from 'react-router-dom'

import LogForm from '../components/LogForm'

function Add(props) {
  console.log(`Add page.`)

  const isLoggedIn = (props.user.cookies.length > 0)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  // show a blank log entry form
  return <LogForm title="Add New Log Entry" />
}

export default Add