import React from 'react'
import { Redirect } from 'react-router-dom'

import SearchBox from '../components/SearchBox'

function Search(props) {
  const isLoggedIn = (props.user.cookies.length > 0)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  return (
    <div className="inner">
      <h2>Search</h2>
      <SearchBox />
    </div>
  )  
}

export default Search
