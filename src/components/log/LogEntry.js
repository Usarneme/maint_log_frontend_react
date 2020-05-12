import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import '../../styles/logEntry.css'

function LogEntry(props) {
  const log = props.data
  if (!log) return ( <div>Error loading log data...</div> )

  return (
    <div className="card log__entry">
      <Link to={`/log/${log.slug}`}>
        <h4>{log.name}</h4>
      </Link>
      <div className="log__details__container">
        <div className="log__details log__details__service">
          <p>{log.shortDescription}</p>
          <p>{log.serviceLocation}</p>
        </div>
        <div className="log__details log__details__dates">
          <p>{moment(log.dateCompleted).fromNow()}</p>
          { log.dateDue && <p>Next <p>{moment(log.dateDue).fromNow()}</p></p> }
        </div>
        <div className="log__details log__details__mileage">
          <p>{Number(log.odometer).toLocaleString()} miles</p>
          { log.mileageDue && <p>Next <p>{Number(log.mileageDue).toLocaleString()}</p></p> }
        </div>
        <div className="log__details log__details__costs">
          <p>P ${log.partsCost}</p>
          <p>L ${log.laborCost}</p>
        </div>
      </div>
    </div>
  )
}

export default LogEntry