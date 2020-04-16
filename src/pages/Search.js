import React from 'react'
import PropTypes from 'prop-types'

import SearchBox from '../components/SearchBox'

function Search(props) {
  if (!props ) return null
  if (props === {} ) return null
  if (Object.keys(props).length === 0) return null
  if (!props.user) return null
  if (Object.keys(props.user).length === 0) return null
  if (!props.user.cookies) return null
  if (!props.user.email) return null
  if (!props.user.name) return null
  if (!props.user.sessionID) return null
  if (!props.user.userID) return null

  return (
    <div className="inner">
      <h2>Search</h2>
      <SearchBox />
    </div>
  )  
}

Search.propTypes = {
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicle: PropTypes.array
  })
}

export default Search