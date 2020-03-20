import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Nav from './components/Nav'

import Account from './pages/Account'
import Add from './pages/Add'
import Home from './pages/Home'
import Log from './pages/Log'
import Login from './pages/Login'
import Logout from './components/Logout'
import Register from './pages/Register'
import Search from './pages/Search'
import Todo from './pages/Todo'

import { userContext } from './contexts/userContext'

function AppRouter() {
  return (
    <Router>
      <userContext.Consumer>
        {({ user, updateUserState }) => <Nav user={user} updateUserState={updateUserState} />}
      </userContext.Consumer>
      <Switch>
          {/* The React Router Provider was overwriting the Context Provider, so the Route component had access to the context user obj and updateUser() func but it's children Router.Consumer -> Router.Provider -> Login did not. Using render={} on the Route component with props passes them all the way down to Login. Per https://github.com/ReactTraining/react-router/issues/4105 */}
        <userContext.Consumer>
          {({ user, updateUserState }) => 
          <>
            <Route path="/account" render={props => <Account {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/add" render={props => <Add {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/" exact={true} render={props => <Home {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/log" render={props => <Log {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/login" render={props => <Login {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/logout" render={props => <Logout {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/register" render={props => <Register {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/search" render={props => <Search {...props} user={user} updateUserState={updateUserState} />} />
            <Route path="/todo" render={props => <Todo {...props} user={user} updateUserState={updateUserState} />} />
          </>
          }
        </userContext.Consumer>
      </Switch>
    </Router>
  )
}

export default AppRouter
