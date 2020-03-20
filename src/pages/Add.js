import React from 'react'

function Add(props) {
  const isLoggedIn = (props.user.cookies.length > 0)

  if (isLoggedIn) {
    return (
      <div className="inner">
        <h2>Add</h2>
      </div>
    )
  }

  return (
    <div className="inner">
      <h2>You must be logged in to add to your log...</h2>
    </div>
  )
}

export default Add