import React from 'react'

import { userContext } from './contexts/userContext'
import AppRouter from './AppRouter'

import './styles/normalize.css'
import './styles/layout.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        name: '', 
        userID: '', 
        sessionID: '', 
        cookies: '',
        email: '',
        vehicle: [],
        log: [],
        currentlySelectedVehicle: {}
      }, 
      updateUserState: this.updateUserState
    }
  }

  updateUserState = user => {
    // this.saveUserToLocalStorage(user)
    this.setState({ user })
  }

  saveUserToLocalStorage = user => {
    const key = user.email
    if (!user.timestamp) {
      user.timestamp = Date.now()
    }
    localStorage.setItem(key, JSON.stringify(user))
  }

  getUserFromLocalStorage = email => {
    return JSON.parse(localStorage.getItem(email))
  }

  render() {
    const context = { user: this.state.user, updateUserState: this.updateUserState }

    return (
      <userContext.Provider value={context}>
        <AppRouter />
      </userContext.Provider>
    )
  }
}

export default App
