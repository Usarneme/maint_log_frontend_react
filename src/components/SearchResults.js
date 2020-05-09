import React from 'react'
import { Link } from 'react-router-dom'

function SearchResults(props) {
  return (
    <section className="search__results" >
      <h4>Results: </h4>
      {props.results.map(result => (
        <div key={result.id} className="search__result">
          <h5>{result.name}</h5>
          <p>{result.shortDescription}</p>
          <div className="search__result__buttons">
            <Link to={`log/${result.slug}`} className="button">View</Link>
            <Link to={`log/${result.id}/edit`} className="button">Edit</Link>            
          </div>
        </div>
      ))}
    </section>
  )
}

export default SearchResults