import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import Account from '../images/account.svg'
import Add from '../images/addLog.svg'
import Home from '../images/home.svg'
import Log from '../images/log.svg'
import Login from '../images/login.svg'
import Logout from '../images/logout.svg'
import Register from '../images/register.svg'
import Search from '../images/search.svg'
import Todo from '../images/todo.svg'

import '../styles/nav.css'

function Nav(props) {
  const isLoggedIn = (props.user.cookies.length > 0)
  console.log('Nav Component. Logged in user? '+isLoggedIn)

  return (
    <div className='topNav'>
      <Link to='/' className='siteTitle'>
        <h2>Vehicle Maintenance Log</h2>
      </Link>
      <nav className='nav'>
        { !isLoggedIn && 
          <>
          <div className='navItem'>
            <NavLink exact to='/' className='navLink' activeClassName='navLink--active'>
              <img src={Home} alt='home' description='home' className='svg' />
              <span>Home</span>
            </NavLink>
          </div>
          <div className='navItem'>
            <NavLink to='/register' className='navLink' activeClassName='navLink--active'>
              <img src={Register} alt='register' description='register' className='svg' />
              <span>Register</span>
            </NavLink>
          </div>
          <div className='navItem'>
            <NavLink to='/login' className='navLink' activeClassName='navLink--active'>
              <img src={Login} alt='login' description='login' className='svg' />
              <span>Login</span>
            </NavLink>
          </div>
          </>
        }
        { isLoggedIn && 
          <>
          <div className='navItem'>
            <NavLink to='/log' className='navLink' activeClassName='navLink--active'>
              <img src={Log} alt='log' description='log' className='svg' />
              <span>Log</span>
            </NavLink>
          </div>
          <div className='navItem'>
            <NavLink to='/add' className='navLink' activeClassName='navLink--active'>
              <img src={Add} alt='addNewLog' description='add a new log entry' className='svg' />
              <span>Add</span>
            </NavLink>
          </div>
          <div className='navItem'>
            <NavLink to='/todo' className='navLink' activeClassName='navLink--active'>
              <img src={Todo} alt='todo' description='todo' className='svg' />
              <span>Todo</span>
            </NavLink>
          </div>
          <div className='navItem'>
            <NavLink to='/search' className='navLink' activeClassName='navLink--active'>
              <img src={Search} alt='search' description='search' className='svg' />
              <span>Search</span>
            </NavLink>
          </div>
          <div className='navItem'>
            <NavLink to='/logout' className='navLink' activeClassName='navLink--active'>
              <img src={Logout} alt='logout' description='logout' className='svg' />
              <span>Logout</span>
            </NavLink>
          </div>
          <div className='navItem'>
            <NavLink to='/account' className='navLink' activeClassName='navLink--active'>
              <img src={Account} alt='account' description='account' className='svg' />
              <span>Account</span>
            </NavLink>
          </div>
          </>
        }
      </nav>
    </div>
  )
}

export default Nav