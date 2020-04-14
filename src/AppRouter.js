import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Nav from './components/Nav'

import Add from './pages/Add'
import Edit from './pages/Edit'
import GuestHome from './pages/GuestHome'
import Home from './pages/Home'
import Log from './pages/Log'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
import Settings from './pages/Settings'
import SingleLogEntry from './pages/SingleLogEntry'
import SiteTitle from './components/SiteTitle'
import Todo from './pages/Todo'

import ProtectedRoute from './components/ProtectedRoute'

import { userContext } from './contexts/userContext'

function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <userContext.Consumer>
          {({ user, updateUserState }) => 
          <>
            <SiteTitle />
            <Route path="/welcome" render={props => <GuestHome {...props} user={user} updateUserState={updateUserState} /> }/>
            <ProtectedRoute path="/" exact={true} component={Home} />
            <ProtectedRoute path="/add" component={Add} />
            <ProtectedRoute path="/log" exact component={Log} />
            <ProtectedRoute path="/log/:id/edit" exact component={Edit} />
            <ProtectedRoute path="/log/:slug" exact component={SingleLogEntry} />
            <ProtectedRoute path="/search" component={Search} />
            <ProtectedRoute path="/settings" component={Settings} />
            <ProtectedRoute path="/todo" component={Todo} />
            { user && user.cookies && user.cookies.length > 0 && <Nav /> }
            <Route path="*" component={NotFound} />
          </>
          }
        </userContext.Consumer>
      </Switch>
    </Router>
  )
}

export default AppRouter
