import React from 'react'

import { authContext } from './contexts/authContext'
import AppRouter from './AppRouter'

import './styles/normalize.css'
import './styles/layout.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.updateAuthState = (authObj) => {
      this.setState({ auth: authObj })
    }

    this.state = {
      auth: {
        username: '', 
        userID: '', 
        sessionID: '', 
        cookies: '',
        email: ''
      }, 
      updateAuthState: this.updateAuthState
    }
  }

  componentDidMount() {
    // TODO - check localStorage for a valid user and set it to state
  }

  render() {
    const context = { auth: this.state.auth, updateAuthState: this.state.updateAuthState }

    return (
      <authContext.Provider value={context}>
        <AppRouter />
      </authContext.Provider>
    )
  }
}

export default App
