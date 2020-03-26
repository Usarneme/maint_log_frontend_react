import React from 'react'
import { Link } from 'react-router-dom'

import '../styles/searchResults.css'

function SearchResults(props) {
  return (
    <ul className="search__results">
      {props.results.map(result => (
        <li key={result.id} className="search__result">
          <strong>{result.name}</strong>
          <div className="search__result__buttons">
            <Link to={`log/${result.slug}`} className="button">View</Link>
            <Link to={`log/${result.id}/edit`} className="button">Edit</Link>            
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SearchResults