import React from 'react'
import { NavLink } from 'react-router-dom'

import Account from '../images/account.svg'
import Home from '../images/home.svg'
import Log from '../images/log.svg'
import Login from '../images/login.svg'
import Logout from '../images/logout.svg'
import Register from '../images/register.svg'
import Todo from '../images/todo.svg'

import './nav.css'

function Nav() {
  return (
    <nav className='nav'>
      <div className='navItem'>
        <NavLink exact to='/' className='navLink' activeClassName='navLink--active'>
          <img src={Home} alt='home' description='home' className='svg' />
          <span>Home</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/register' className='navLink' activeClassName='navLink--active'>
          <img src={Register} alt='register' description='register' className='svg' />
          <span>Register</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/login' className='navLink' activeClassName='navLink--active'>
          <img src={Login} alt='login' description='login' className='svg' />
          <span>Login</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/log' className='navLink' activeClassName='navLink--active'>
          <img src={Log} alt='log' description='log' className='svg' />
          <span>Log</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/logout' className='navLink' activeClassName='navLink--active'>
          <img src={Logout} alt='logout' description='logout' className='svg' />
          <span>Logout</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/todo' className='navLink' activeClassName='navLink--active'>
          <img src={Todo} alt='todo' description='todo' className='svg' />
          <span>Todo</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/account' className='navLink' activeClassName='navLink--active'>
          <img src={Account} alt='account' description='account' className='svg' />
          <span>Account</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav