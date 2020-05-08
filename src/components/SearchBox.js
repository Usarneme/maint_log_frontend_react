import React from 'react'
import axios from 'axios'
import { ReactSVG } from 'react-svg'

import SearchResults from './SearchResults'
import Loading from './Loading'
import MagnifyingGlassIcon from '../images/magnifying.svg'

import '../styles/search.css'

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: [],
      searching: false,
      counter: 0
    }
  }

  getInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/search?q=${this.state.query}`)
      // console.log('REACT CLIENT - api search for '+this.state.query+'. Result: ')
      // console.log(response.data)

      if (response.data.length) {
        this.setState({
          results: response.data,
          searching: false
        }) 
      }
    } catch (err) {
        // console.log('Error posting to /api/search')
        console.dir(err)
        alert('Error getting log data please try again')
    }
  }

  handleInputChange = e => {
    e.preventDefault()
    this.setState({
      query: e.target.value,
      searching: true,
      results: []
    }, () => {
      // only query the API at most 2x per second (every 500 ms)
      if (this.state.query && this.state.query.length > 1 && Date.now() - this.state.counter > 500) {
        this.getInfo()
        this.setState({ counter: Date.now() })
      } else {
        setTimeout(() => {
          this.getInfo()
        }, 500)
      }
    })
  }

  blurCleanup = () => {
    if (this.state.query.length === 0) this.setState({ results: [] })
  }

  clearInput = e => {
    e.preventDefault()
    this.setState({ query: '', searching: false, results: [] })
  }
  
  // searchInput.addEventListener('keyup', (e) => {
  //   // Ignore keys except up, down and enter for keyboard selection of result link
  //   if (![38, 40, 13].includes(e.keyCode)) {
  //     return; 
  //   }
  //   const activeClass = 'search__result--active';
  //   const current = search.querySelector(`.${activeClass}`);
  //   const items = search.querySelectorAll('.search__result');
  //   let next;
  //   if (e.keyCode === 40 && current) {
  //     next = current.nextElementSibling || items[0];
  //   } else if (e.keyCode === 40) {
  //     next = items[0];
  //   } else if (e.keyCode === 38 && current) {
  //     next = current.previousElementSibling || items[items.length - 1]
  //   } else if (e.keyCode === 38) {
  //     next = items[items.length - 1];
  //   } else if (e.keyCode === 13 && current.href) {
  //     window.location = current.href;
  //     return;
  //   }
  //   if (current) {
  //     current.classList.remove(activeClass);
  //   }
  //   next.classList.add(activeClass);
  // });

  render() {
    const buttonImg = this.state.query && this.state.query.length > 0 ? 
      <strong>&times;</strong> :
      <ReactSVG src={MagnifyingGlassIcon} role="img" aria-label="Magnifying Glass Icon" fallback={() => <img src={MagnifyingGlassIcon} alt="magnifying glass icon" description="magnifying glass icon" className="svg" />} /> 

    return (
      <form className="search__form">
        <div className="search__input__container">
          <input
            placeholder="Search parts, service, etc..."
            onKeyUp={this.handleInputChange}
            onChange={this.handleInputChange}
            onBlur={this.blurCleanup}
            value={this.state.query}
            className='search__input'
          />
          <button className="button search__button" onClick={this.clearInput}>{buttonImg}</button>
        </div>
        {this.state.loading && <Loading message={`Searching for: ${this.state.query}`} />}
        {this.state.results && this.state.results.length > 0 &&
          <>
            <h5>Results:</h5>
              <SearchResults homepage={this.props.homepage} results={this.state.results} /> 
          </>
        }
        {this.state.results.length === 0 && this.state.query.length > 0 &&
          <h5>No match found for that search...</h5>
        }
      </form>
    )
  }
}

export default SearchBox
