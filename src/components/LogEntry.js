import React from 'react'
import moment from 'moment'

import '../styles/logEntry.css'

function LogTableEntry(props) {
  const log = props.data
  if (!log) return ( <div>Error loading log data...</div> )

  return (
    <div>
      {log && 
        <div className="log__entry">
          <h5>{log.name}</h5>
          <div className="log__details__container">
            <div className="log__details log__details__service">
              <span>{log.shortDescription}</span>
              <span>{log.serviceLocation}</span>
            </div>
            <div className="log__details log__details__dates">
              <span>{moment(log.dateCompleted).fromNow()}</span>
              { log.dateDue && <span>Next <span>{moment(log.dateDue).fromNow()}</span></span> }
            </div>
            <div className="log__details log__details__mileage">
              <span>{Number(log.odometer).toLocaleString()} miles</span>
              { log.mileageDue && <span>Next <span>{Number(log.mileageDue).toLocaleString()}</span></span> }
            </div>
            <div className="log__details log__details__costs">
              <span>P ${log.partsCost}</span>
              <span>L ${log.laborCost}</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default LogTableEntry