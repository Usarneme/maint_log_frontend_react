import React from 'react'

import { userContext } from './contexts/userContext'
import AppRouter from './AppRouter'

import './styles/normalize.css'
import './styles/layout.css'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.updateUserState = (user) => {
      this.setState({ user })
    }

    this.state = {
      user: {
        username: '', 
        userID: '', 
        sessionID: '', 
        cookies: '',
        email: '',
        vehicle: '',
        log: ''
      }, 
      updateUserState: this.updateUserState
    }
  }

  // componentDidMount() {
  //   // TODO - check localStorage for a valid user and set it to state
  // }

  render() {
    const context = { user: this.state.user, updateUserState: this.state.updateUserState }

    return (
      <userContext.Provider value={context}>
        <AppRouter />
      </userContext.Provider>
    )
  }
}

export default App
