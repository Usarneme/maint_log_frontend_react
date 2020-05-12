import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Add from './pages/Add'
import Edit from './pages/Edit'
import GuestHome from './pages/GuestHome'
import Home from './pages/Home'
import Log from './pages/Log'
import NotFound from './pages/NotFound'
import Search from './pages/Search'
import Settings from './pages/Settings'
import SingleLogEntry from './pages/SingleLogEntry'
import Todo from './pages/Todo'

import Nav from './components/Nav'
import ProtectedRoute from './components/account/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import SiteTitle from './components/SiteTitle'

import { UserConsumer } from './contexts/UserContext'

function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <SiteTitle />
      <Switch>
        <UserConsumer>
          {({ user, updateUserState }) => 
          <div className="container">
            <Route path="/welcome" component={GuestHome} />
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
          </div>
          }
        </UserConsumer>
      </Switch>
    </Router>
  )
}

export default AppRouter
