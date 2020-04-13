import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

import LogForm from '../components/LogForm'

function Edit(props) {
  const { id } = useParams()
  const isLoggedIn = (props.user && props.user.cookies ? props.user.cookies.length > 0 : false)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  // do not display while data is being fetched/loaded/mounted
  // TODO make this part of an error boundary
  if (!props || !props.user || !props.user.log) return null
  const log = props.user.log.filter(entry => entry.id === id)
  // console.log('Edit page. Pushing log '+id+' to LogForm component...')
  // console.dir(log[0])

  return <LogForm log={log[0]} {...props} />
}

export default Edit
