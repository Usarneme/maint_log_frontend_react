import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Nav from './components/Nav'

import Account from './pages/Account'
import Home from './pages/Home'
import Log from './pages/Log'
import Login from './pages/Login'
import Logout from './components/Logout'
import Register from './pages/Register'
import Todo from './pages/Todo'

import { authContext } from './contexts/authContext'
import withAuth from './components/withAuth'

function AppRouter() {
  return (
    <Router>
      <authContext.Consumer>
        {({ auth, updateAuthState }) => <Nav auth={auth} updateAuthState={updateAuthState} />}
      </authContext.Consumer>

      <Switch>
        <Route path="/account" component={withAuth(Account)} />
        <Route path="/log" component={withAuth(Log)} />
        <Route path="/logout" component={withAuth(Logout)} />
        <Route path="/todo" component={withAuth(Todo)} />
        <Route path="/register" component={Register} />
        <authContext.Consumer>
          {/* The React Router Provider was overwriting the Context Provider, so the Route component had access to the context auth obj and updateAuth() func but it's children Router.Consumer -> Router.Provider -> Login did not. Using render={} on the Route component with props passes them all the way down to Login. Per https://github.com/ReactTraining/react-router/issues/4105 */}
          {({ auth, updateAuthState }) => <Route path="/login" render={routeProps => <Login {...routeProps} auth={auth} updateAuthState={updateAuthState} />} />}
        </authContext.Consumer>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  )
}

export default AppRouter
