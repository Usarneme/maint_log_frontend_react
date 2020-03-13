import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default function withAuth(ComponentToProtect) {  
  return class extends Component {
    constructor() {
      super()
      this.state = {
        loading: true,
        redirect: false,
      }
    }    
    
    componentDidMount() {
      console.log(`mounting withAuth HOC. fetching from domain: ${process.env.REACT_APP_API_DOMAIN}/api/isLoggedIn`)
      fetch(`${process.env.REACT_APP_API_DOMAIN}/api/isLoggedIn`)
        .then(res => {
          console.log(`Received response from api/isLoggedIn:`)
          console.dir(res)
          if (res.status === 200) {
            this.setState({ loading: false })
          } else {
            const error = new Error(res.error)
            throw error
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({ loading: false, redirect: true })
        })
    }    
    
    render() {
      const { loading, redirect } = this.state
      if (loading) {
        return null
      }
      if (redirect) {
        console.log(this.state)
        return <Redirect to="/login" />
      }
      return <ComponentToProtect {...this.props} />
    }
  }}