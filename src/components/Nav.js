import React from 'react'
import { NavLink } from 'react-router-dom'

import Settings from '../images/account.svg'
import Add from '../images/addLog.svg'
import Log from '../images/log.svg'
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
      <NavLink to='/settings' className='navLink' activeClassName='navLink--active'>
        <img src={Settings} alt='settings' description='settings' className='svg' />
        <h5>Settings</h5>
      </NavLink>
    </nav>
  )
}

export default Nav