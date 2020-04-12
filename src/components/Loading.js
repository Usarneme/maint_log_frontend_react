import React from 'react'

import '../styles/loading.css'

const Loading = (props) => {
  if (!props || !props.message) return

  return (
    <div className="loading">{props.message.charAt(0).toUpperCase() + props.message.slice(1)}</div>
  )
}

export default Loading