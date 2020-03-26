import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

import LogForm from '../components/LogForm'

function Edit(props) {
  const { id } = useParams()
  const isLoggedIn = (props.user.cookies.length > 0)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  const log = props.user.log.filter(entry => entry.id === id)
  // console.log('Edit page. Pushing log '+id+' to LogForm component...')
  // console.dir(log[0])

  return <LogForm title={`Edit Log Entry - ${log[0].name}`} log={log[0]} />
}

export default Edit
