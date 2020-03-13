import React from 'react'

const authContext = React.createContext({
  auth: {},
  updateAuthState: () => {}
})

export {
  authContext 
}
