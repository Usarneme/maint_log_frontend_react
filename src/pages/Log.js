import React from 'react'

function Log(props) {
  const dump = JSON.stringify(props.user.log)

  return (
    <div className="inner">
      <h2>Log</h2>
      {dump}
    </div>
  )
}

export default Log