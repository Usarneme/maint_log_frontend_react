import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import SearchBox from '../components/SearchBox'
import VehicleHeader from '../components/VehicleHeader'

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
      {isLoggedIn && <>
        <VehicleHeader vehicle={vehicle} / >
        <div className="home__actions__container">
          <Link className="home__actions history" to="/log">
            <ReactSVG src={LogIcon} role="img" aria-label="Log Icon" fallback={() => <img src={LogIcon} alt="log icon" description="log icon" className="svg" />} /> 
            <h4 className="button">View Full Maintenance Log History</h4>
          </Link>
          <Link className="home__actions add" to="/add">
            <ReactSVG src={AddIcon} role="img" aria-label="Add Icon" fallback={() => <img src={AddIcon} alt="add icon" description="add icon" className="svg" />} /> 
            <h4 className="button">Add New Log Entry</h4>
          </Link>
          <Link className="home__actions todo upcoming-maintenance" to="/todo">
            <ReactSVG src={TodoIcon} role="img" aria-label="Todo Icon" fallback={() => <img src={TodoIcon} alt="todo icon" description="todo icon" className="svg" />} /> 
            <h4 className="button">View Upcoming Scheduled Maintenance</h4>
          </Link>
          <div className="home__actions search__main search">
            <ReactSVG src={SearchIcon} role="img" aria-label="Search Icon" fallback={() => <img src={SearchIcon} alt="search icon" description="search icon" className="svg" />} /> 
            <SearchBox homepage={true} />
          </div>
          <Link className="home__actions settings" to="/settings">
            <ReactSVG src={SettingsIcon} role="img" aria-label="Settings Icon" fallback={() => <img src={SettingsIcon} alt="settings icon" description="settings icon" className="svg" />} /> 
            <h4 className="button">Add Your Vehicle and View Other Settings</h4>
          </Link>
        </div>
      </>}
    </div>
  )
}

export default Home