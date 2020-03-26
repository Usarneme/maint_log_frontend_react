import React from 'react'
import axios from 'axios'

import SearchResults from './SearchResults'

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }
  }

  getInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/search?q=${this.state.query}`)
      console.log('REACT CLIENT - api search for '+this.state.query+'. Result: ')
      console.log(response.data)

      if (response.data.length) {
        this.setState({
          results: response.data
        }) 
      }
    } catch (err) {
        console.log('Error posting to /api/search')
        console.dir(err)
        alert('Error getting log data please try again')
    }
  }

  handleInputChange = (e) => {
    this.setState({
      query: e.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
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
    return (
      <form>
        <input
          placeholder="Search parts, service, etc..."
          onChange={(e) => this.handleInputChange(e)}
        />
        {this.state.results && this.state.results.length > 0 &&
          <>
            <p>Results:</p>
            <SearchResults results={this.state.results} />
          </>
        }
      </form>
    )
  }

}

export default SearchBox
