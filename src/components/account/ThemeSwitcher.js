import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ThemeSwitcher = props => {
  const [currentTheme, changeTheme] = useState(props.currentTheme || 'dark')

  function toggleTheme(event) {
    event.preventDefault()
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    document.documentElement.className = newTheme
    changeTheme(newTheme) 
  }

  return (
    <div className="card">
      <h3>Theme Settings</h3>
      <div className="theme__container">
        <label htmlFor="theme">{`${currentTheme.substring(0,1).toUpperCase()}${currentTheme.substring(1)} Mode Enabled`}</label>
        <button className="button" onClick={toggleTheme}>Switch Theme</button>
      </div>
    </div>
  )
}

ThemeSwitcher.propTypes = {
  currentTheme: PropTypes.string.isRequired
}

export default ThemeSwitcher