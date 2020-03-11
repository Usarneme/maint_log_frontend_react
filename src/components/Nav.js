import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import './nav.css'

function Nav() {
  return (
    <nav className='nav'>
      <div className='navItem'>
        <NavLink exact to='/' className='navLink' activeClassName='navLink--active'>
          <ReactSVG src='./home.svg' alt='home' description='home' className='svg' />
          <span>Home</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/register' className='navLink' activeClassName='navLink--active'>
          <ReactSVG src='./register.svg' alt='register' description='register' className='svg' />
          <span>Register</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/login' className='navLink' activeClassName='navLink--active'>
          <ReactSVG src='./login.svg' alt='login' description='login' className='svg' />
          <span>Login</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/log' className='navLink' activeClassName='navLink--active'>
          <ReactSVG src='./log.svg' alt='log' description='log' className='svg' />
          <span>Log</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/todo' className='navLink' activeClassName='navLink--active'>
          <ReactSVG src='./todo.svg' alt='todo' description='todo' className='svg' />
          <span>Todo</span>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink exact to='/account' className='navLink' activeClassName='navLink--active'>
          <ReactSVG src='./account.svg' alt='account' description='account' className='svg' />
          <span>Account</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav