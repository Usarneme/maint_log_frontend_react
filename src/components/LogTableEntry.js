import React from 'react'

function LogTableEntry(props) {
  return (
    <div>
      <h2>Log Table Entry</h2>
      {props && 
        <div>
          <span>{props.logEntry.name}</span>
        </div>}
    </div>
  )
}

export default LogTableEntry