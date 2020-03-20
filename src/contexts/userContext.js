import React from 'react'

const userContext = React.createContext({
  user: {},
  updateUserState: () => {}
})

export {
  userContext 
}
