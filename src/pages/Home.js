import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import SearchBox from '../components/SearchBox'
import VehicleHeader from '../components/VehicleHeader'

import RegisterIcon from '../images/register.svg'
import LoginIcon from '../images/login.svg'
import SearchIcon from '../images/search.svg'
import AddIcon from '../images/addLog.svg'
import TodoIcon from '../images/todo.svg'
import SettingsIcon from '../images/account.svg'
import LogIcon from '../images/log.svg'

import '../styles/home.css'

function Home(props) {
  // console.log(props)
  const isLoggedIn = (props.user && props.user.cookies ? props.user.cookies.length > 0 : false)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  // console.log('Home Component. Logged in user? '+isLoggedIn)
  let vehicle = {}
  if (props.user.vehicle && props.user.vehicle[0]) {
    vehicle = props.user.vehicle[0]
  }

  return (
    <div className="inner">
      {!isLoggedIn &&
        <>
          <Link className="home__actions register" to="/register">
            <div>
              <img src={RegisterIcon} alt="register" description="register icon" className="svg" />
            </div>
            <h4 className="button">Register to Start Your Maintenance Log</h4>
          </Link>
          <Link className="home__actions login" to="/login">
            <div>
              <img src={LoginIcon} alt="login" description="login icon" className="svg" />
            </div>
            <h4 className="button">Login to View Your Maintenance Log</h4>
          </Link>
        </>
      }
      {isLoggedIn &&
        <VehicleHeader vehicle={vehicle} >
          <Link className="home__actions history" to="/log">
            <div>
              <img src={LogIcon} alt="log" description="log icon" className="svg" />
            </div>
            <h4 className="button">View Full Maintenance Log History</h4>
          </Link>
          <Link className="home__actions add" to="/add">
            <div>
              <img src={AddIcon} alt="add" description="add icon" className="svg" />
            </div>
            <h4 className="button">Add New Log Entry</h4>
          </Link>
          <Link className="home__actions todo upcoming-maintenance" to="/todo">
            <div>
              <img src={TodoIcon} alt="todo" description="upcoming maintenance icon" className="svg" />
            </div>
            <h4 className="button">View Upcoming Scheduled Maintenance</h4>
          </Link>
          <div className="home__actions search__main search">
            <div>
              <img src={SearchIcon} alt="search" description="search icon" className="svg" />
            </div>
            <SearchBox homepage={true} />
          </div>
          <Link className="home__actions settings" to="/settings">
            <div>
              <img src={SettingsIcon} alt="settings" description="settings icon" className="svg" />
            </div>
            <h4 className="button">Add Your Vehicle and View Other Settings</h4>
          </Link>
        </VehicleHeader>
      }
    </div>
  )
}

export default Home