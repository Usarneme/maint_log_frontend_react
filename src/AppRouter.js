import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

import Nav from './components/Nav'

import Settings from './pages/Settings'
import Add from './pages/Add'
import Edit from './pages/Edit'
import GuestHome from './pages/GuestHome'
import Home from './pages/Home'
import Log from './pages/Log'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
import SingleLogEntry from './pages/SingleLogEntry'
import SiteTitle from './components/SiteTitle'
import Todo from './pages/Todo'

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
            <Route path="/" exact={true} render={props => <Home {...props} user={user} updateUserState={updateUserState} /> }/>
            <Route path="/settings" render={props => <Settings {...props} user={user} updateUserState={updateUserState} /> }/>
            <Route path="/add" render={props => <Add {...props} user={user} updateUserState={updateUserState} /> }/>
            <Route path="/log" exact render={props => <Log {...props} user={user} updateUserState={updateUserState} /> }/>
            <Route path="/log/:id/edit" exact render={props => <Edit {...props} user={user} updateUserState={updateUserState} /> }/>
            <Route path="/log/:slug" exact render={props => <SingleLogEntry {...props} user={user} updateUserState={updateUserState} /> }/>
            <Route path="/search" render={props => <Search {...props} user={user} updateUserState={updateUserState} /> }/>
            <Route path="/todo" render={props => <Todo {...props} user={user} updateUserState={updateUserState} /> }/>
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
