import React from 'react'
import { Link } from 'react-router-dom'

import Home from '../images/home.svg'
import '../styles/siteTitle.css'

const SiteTitle = () => {
  return (
    <Link to='/' className='siteTitle'>
      <img src={Home} alt='home' description='home' className='svg' />
      <h1>Vehicle Maintenance Log</h1>
    </Link>
  )
}

export default SiteTitle