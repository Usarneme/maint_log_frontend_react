import React from 'react'
import { Link } from 'react-router-dom'

import VehicleHeader from '../components/VehicleHeader'

import RegisterIcon from '../images/register.svg'
import LoginIcon from '../images/login.svg'
import SearchIcon from '../images/search.svg'
import AddIcon from '../images/addLog.svg'
import TodoIcon from '../images/todo.svg'
import AccountIcon from '../images/account.svg'
import LogIcon from '../images/log.svg'

import '../styles/home.css'

function Home(props) {
  // console.log(props)
  const isLoggedIn = (props.user.cookies.length > 0)
  // console.log('Home Component. Logged in user? '+isLoggedIn)
  const vehicle = props.user.vehicle[0]

  return (
    <div className="inner">
      {!isLoggedIn &&
        <>
          <Link className="main register" to="/register">
            <img src={RegisterIcon} alt="register" description="register icon" className="svg" />
            <span>Register to Start Your Maintenance Log</span>
          </Link>
          <Link className="main login" to="/login">
            <img src={LoginIcon} alt="login" description="login icon" className="svg" />
            <span>Login to View Your Maintenance Log</span>
          </Link>
        </>
      }
      {isLoggedIn &&
        <VehicleHeader vehicle={vehicle} >
          <div className="main search__main search">
            <img src={SearchIcon} alt="search" description="search icon" className="svg" />
            <input className="search__input" type="text" placeholder="Search by part, date, etc..." name="search" />
            <div className="search__results"></div>
          </div>
          <Link className="main add" to="/add">
            <img src={AddIcon} alt="add" description="add icon" className="svg" />
            <span>Add New Log Entry</span>
          </Link>
          <Link className="main todo upcoming-maintenance" to="/todo">
            <img src={TodoIcon} alt="todo" description="upcoming maintenance icon" className="svg" />
            <span>View Upcoming Scheduled Maintenance</span>
          </Link>
          <Link className="main account" to="/account">
            <img src={AccountIcon} alt="account" description="account icon" className="svg" />
            <span>Add Your Vehicle and View Other Settings</span>
          </Link>
          <Link className="main history" to="/log">
            <img src={LogIcon} alt="log" description="log icon" className="svg" />
            <span>View Full Maintenance Log History</span>
          </Link>
        </VehicleHeader>
      }
    </div>
  )
}

export default Home