import React from 'react'
import PropTypes from 'prop-types'

import LogForm from '../components/log/LogForm'

function Edit(props) {
  const { id } = props.match.params
  // find the log entry that matches the ID from the URL parameter...
  const log = props.user.log.filter(entry => entry.id === id)
  return <LogForm {...props} log={log[0]} />
}

Edit.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicle: PropTypes.array
  }),
  updateUserState: PropTypes.func.isRequired
}

export default Edit
