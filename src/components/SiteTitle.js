import React from 'react'
import { Link } from 'react-router-dom'

import Home from '../images/home.svg'
import '../styles/siteTitle.css'

const SiteTitle = () => {
  return (
    <Link to='/' className='siteTitle'>
      <img src={Home} alt='home' description='home' className='svg' />
      <h2>Vehicle Maintenance Log</h2>
    </Link>
  )
}

export default SiteTitle