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

import { authContext } from './contexts/authContext'

function AppRouter() {
  return (
    <Router>
      <authContext.Consumer>
        {({ auth, updateAuthState }) => <Nav auth={auth} updateAuthState={updateAuthState} />}
      </authContext.Consumer>
      <Switch>
          {/* The React Router Provider was overwriting the Context Provider, so the Route component had access to the context auth obj and updateAuth() func but it's children Router.Consumer -> Router.Provider -> Login did not. Using render={} on the Route component with props passes them all the way down to Login. Per https://github.com/ReactTraining/react-router/issues/4105 */}
        <authContext.Consumer>
          {({ auth, updateAuthState }) => 
          <>
            <Route path="/account" render={routeProps =>  <Account {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
            <Route path="/add" render={routeProps =>      <Add {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
            <Route path="/log" render={routeProps =>      <Log {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
            <Route path="/login" render={routeProps =>    <Login {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
            <Route path="/logout" render={routeProps =>   <Logout {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
            <Route path="/register" render={routeProps => <Register {...routeProps} auth={auth} updateAUthState={updateAuthState} />} />
            <Route path="/search" render={routeProps =>   <Search {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
            <Route path="/todo" render={routeProps =>     <Todo {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
            <Route exact={true} path="/" render={routeProps =>   <Home {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />
          </>
          }
        </authContext.Consumer>
      </Switch>
    </Router>
  )
}

export default AppRouter
