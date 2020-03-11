import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Nav from './components/Nav'

import Account from './pages/Account'
import Home from './pages/Home'
import Log from './pages/Log'
import Login from './pages/Login'
import Register from './pages/Register'
import Todo from './pages/Todo'

import './components/normalize.css';
import './components/layout.css'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/log">
          <Log />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/todo">
          <Todo />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
