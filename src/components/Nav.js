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
      <NavLink to='/log' className='navLink' activeClassName='navLink--active'>
        <img src={Log} alt='log' description='log' className='svg' />
        <h5>Log</h5>
      </NavLink>
      <NavLink to='/add' className='navLink' activeClassName='navLink--active'>
        <img src={Add} alt='addNewLog' description='add a new log entry' className='svg' />
        <h5>Add</h5>
      </NavLink>
      <NavLink to='/todo' className='navLink' activeClassName='navLink--active'>
        <img src={Todo} alt='todo' description='todo' className='svg' />
        <h5>Todo</h5>
      </NavLink>
      <NavLink to='/search' className='navLink' activeClassName='navLink--active'>
        <img src={Search} alt='search' description='search' className='svg' />
        <h5>Search</h5>
      </NavLink>
      <NavLink to='/logout' className='navLink' activeClassName='navLink--active'>
        <img src={Logout} alt='logout' description='logout' className='svg' />
        <h5>Logout</h5>
      </NavLink>
      <NavLink to='/account' className='navLink' activeClassName='navLink--active'>
        <img src={Account} alt='account' description='account' className='svg' />
        <h5>Account</h5>
      </NavLink>
    </nav>
  )
}

export default Nav