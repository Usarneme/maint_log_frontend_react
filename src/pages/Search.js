import React from 'react'

function Search(props) {
  const isLoggedIn = (props.user.cookies.length > 0)

  if (isLoggedIn) {
    return (
      <div className="inner">
        <h2>Search</h2>
      </div>
    )
  }

  return (
    <div className="inner">
      <h2>You must be logged in to search your log...</h2>
    </div>
  )
}

export default Search