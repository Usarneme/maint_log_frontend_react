import React from 'react'

function Todo(props) {
  const isLoggedIn = (props.user.cookies.length > 0)

  if (isLoggedIn) {
    return (
      <div className="inner">
        <h2>Upcoming Maintenance Items</h2>
      </div>
    )
  }

  return (
    <div className="inner">
      <h2>You must be logged in to view your upcoming maintenance items...</h2>
    </div>
  )
}

export default Todo