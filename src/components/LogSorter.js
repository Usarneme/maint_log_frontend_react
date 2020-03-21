import React from 'react'

import '../styles/logSorter.css'

const LogSorter = (props) => {

  function sortBy(method) {
    // don't sort if it doesn't exist or there are 1 or 0 log entries
    if (!props || !props.user || !props.user.log || props.user.log.length <= 1) return

    if (method === 'date') {
      let tempLogArray = []
      // if they are in descending order
      if ( new Date(props.user.log[0].dateCompleted).valueOf() > new Date(props.user.log[1].dateCompleted).valueOf() ) {
        // sort log entries in ascending order
        tempLogArray = [...props.user.log].sort((first, second) => new Date(first.dateCompleted).valueOf() - new Date(second.dateCompleted).valueOf() )
      } else {
        tempLogArray = [...props.user.log].sort((first, second) => new Date(second.dateCompleted).valueOf() - new Date(first.dateCompleted).valueOf() )
      }
      let updatedUser = {...props.user}
      updatedUser.log = tempLogArray
      props.updateUserState(updatedUser)
      return
    }

    if (method === 'service') {
      let tempLogArray = []
      // if they are not already in alphabetical order 
      if (props.user.log[0].name.localeCompare(props.user.log[1].name) > -1) {
        // sort them
        tempLogArray = [...props.user.log].sort((first, second) => first.name.localeCompare(second.name) )
      } else { // otherwise sort them in reverse alphabetical order
        tempLogArray = [...props.user.log].sort((first, second) => second.name.localeCompare(first.name) )
      }
      let updatedUser = {...props.user}
      updatedUser.log = tempLogArray
      props.updateUserState(updatedUser)
      return
    }

    if (method === 'mileage') {
      let tempLogArray = []
      if (Number(props.user.log[0].odometer) > Number(props.user.log[1].odometer)) {
        tempLogArray = [...props.user.log].sort((first, second) => Number(first.odometer) <= Number(second.odometer) ? -1 : 1 )
      } else {
        tempLogArray = [...props.user.log].sort((first, second) =>  Number(first.odometer) <= Number(second.odometer) ? 1 : -1 )
      }
      let updatedUser = {...props.user}
      updatedUser.log = tempLogArray
      props.updateUserState(updatedUser)
      return
    }

    if (method === 'costs') {
      let tempLogArray = []
      if ( (Number(props.user.log[0].partsCost) + Number(props.user.log[0].laborCost)) >= (Number(props.user.log[1].partsCost) + Number(props.user.log[1].laborCost))) {
        tempLogArray = [...props.user.log].sort((first, second) => (Number(first.partsCost) + Number(first.laborCost)) <= (Number(second.partsCost) + Number(second.laborCost)) ? -1 : 1 )
      } else {
        tempLogArray = [...props.user.log].sort((first, second) => (Number(first.partsCost) + Number(first.laborCost)) <= (Number(second.partsCost) + Number(second.laborCost)) ? 1 : -1 )
      }
      let updatedUser = {...props.user}
      updatedUser.log = tempLogArray
      props.updateUserState(updatedUser)
      return
    }
  }

  return (
    <div className='log__sorter__container'>
      <div className="log__sorter__item log__sorter__service">
        <span onClick={() => sortBy('service')}>service</span>
      </div>
      <div className="log__sorter__item log__sorter__dates">
        <span onClick={() => sortBy('date')}>dates</span>
      </div>
      <div className="log__sorter__item log__sorter__mileage">
        <span onClick={() => sortBy('mileage')}>mileage</span>
      </div>
      <div className="log__sorter__item log__sorter__costs">
        <span onClick={() => sortBy('costs')}>costs</span>
      </div>
    </div>
  )
}

export default LogSorter
