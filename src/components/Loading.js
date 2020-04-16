import React from 'react'
import PropTypes from 'prop-types'

import '../styles/loading.css'

const Loading = (props) => {
  if (!props || !props.message) return null

  return (
    <div className="loading">{props.message.charAt(0).toUpperCase() + props.message.slice(1)}</div>
  )
}

Loading.propTypes = {
  message: PropTypes.string.isRequired
}

export default Loading