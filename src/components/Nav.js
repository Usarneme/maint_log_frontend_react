import React from 'react'
import { NavLink } from 'react-router-dom'

import Account from '../images/account.svg'
import Add from '../images/addLog.svg'
import Log from '../images/log.svg'
import Logout from '../images/logout.svg'
import Search from '../images/search.svg'
import Todo from '../images/todo.svg'

import '../styles/nav.css'

const Nav = () => {
  return (
    <nav className='nav'>
      <div className='navItem'>
        <NavLink to='/log' className='navLink' activeClassName='navLink--active'>
          <img src={Log} alt='log' description='log' className='svg' />
          <h3>Log</h3>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink to='/add' className='navLink' activeClassName='navLink--active'>
          <img src={Add} alt='addNewLog' description='add a new log entry' className='svg' />
          <h3>Add</h3>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink to='/todo' className='navLink' activeClassName='navLink--active'>
          <img src={Todo} alt='todo' description='todo' className='svg' />
          <h3>Todo</h3>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink to='/search' className='navLink' activeClassName='navLink--active'>
          <img src={Search} alt='search' description='search' className='svg' />
          <h3>Search</h3>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink to='/logout' className='navLink' activeClassName='navLink--active'>
          <img src={Logout} alt='logout' description='logout' className='svg' />
          <h3>Logout</h3>
        </NavLink>
      </div>
      <div className='navItem'>
        <NavLink to='/account' className='navLink' activeClassName='navLink--active'>
          <img src={Account} alt='account' description='account' className='svg' />
          <h3>Account</h3>
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav