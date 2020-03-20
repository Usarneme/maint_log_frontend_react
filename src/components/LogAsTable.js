import React from 'react'

import LogTableEntry from './LogTableEntry'

function LogAsTable(props) {
  const log = props.log

  return (
    <div>
      <h2>Log As A Table</h2>
      {log && log.map(entry => <LogTableEntry key={entry._id} logEntry={entry} />)}
    </div>
  )
}

export default LogAsTable
