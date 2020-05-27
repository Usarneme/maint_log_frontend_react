import React from 'react'
import { Redirect } from 'react-router'

function NotFound() {
  return <Redirect to="/welcome" />
}

export default NotFound