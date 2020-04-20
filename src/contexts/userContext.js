import React from 'react'

const userContext = React.createContext({
  user: {
    cookies: '',
    email: '',
    log: [],
    name: '',
    sessionID: '',
    userID: '',
    vehicle: []  
  },
  updateUserState: () => {}
})

export {
  userContext 
}
