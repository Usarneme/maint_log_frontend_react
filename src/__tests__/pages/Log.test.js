import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TestRenderer from 'react-test-renderer'

import ProtectedRoute from '../../components/ProtectedRoute'
import Log from '../../pages/Log'
import { userContext } from '../../contexts/userContext'

describe('LOG PAGE', () => {
  describe('* NOT LOGGED IN', () => {
    it('** w/Routing and Context HOCs. Log called without user or updateUserState props redirects to /welcome', () => {
      const context = { user: {}, updateUserState: () => {} }

      const tree = TestRenderer.create(
        <userContext.Provider value={context}>
          <Router>
            <userContext.Consumer>
            {({ user, updateUserState }) => 
              <ProtectedRoute path="/log" exact component={Log} />
            }
            </userContext.Consumer>
          </Router>
        </userContext.Provider>
      ).toTree()
      // console.log(tree.instance.history)
      expect(tree.instance.history.action).toBe('REPLACE')
      expect(tree.instance.history.location.pathname).toBe('/welcome')
    })

    it('** Wrapped in a ProtectedRoute HOC -> <Log /> redirects to /welcome', () => {
      let user = {}
      const context = { user: user, updateUserState: (val) => user = val }

      const raw = TestRenderer.create(
        <userContext.Provider value={context}>
          <Router>
            <userContext.Consumer>
            {({ user, updateUserState }) => 
              <ProtectedRoute path="/log" exact component={Log} />
            }
            </userContext.Consumer>
          </Router>
        </userContext.Provider>
      )
      const tree = raw.toTree()
      expect(tree.rendered.props.history.action).toEqual('REPLACE')
      expect(tree.rendered.rendered.rendered.props.to).toEqual('/welcome')
    })

    it('** returns null if no user prop is passed', () => {
      const raw = TestRenderer.create(
        <Log />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })

    it('** returns null if an empty user prop is passed', () => {
      const raw = TestRenderer.create(
        <Log user={{}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })

    it('** returns null if a randomly malformed user prop is passed', () => {
      const userProps = {
        "cookies": "abc123",
        "email": "email@address.com",
        "log": [{"_id": 0},{"_id": 1}],
        "name": "username",
        "vehicle": [{"vehicle0": {}}]
      }
  
      const raw = TestRenderer.create(
        <Log user={{ "blah": {}, "cookies": "", "otherkey": [1,2,3]}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })
  })

  describe('* LOGGED IN', () => {  
    const userProps = {
      "cookies": "abc123",
      "email": "email@address.com",
      "log": [{"_id": 0},{"_id": 1}],
      "name": "username",
      "vehicle": [{"vehicle0": {}}]
    }

    it('** Log called with fake user and fake updateUserState props renders the Log Page', () => {
      const json = TestRenderer.create(<Router><Log user={userProps} updateUserState={() => {}} /></Router>).toJSON()
      expect(json.children[0].children[0]).toEqual('Service History')
    })

    it('** Inside a Router the Log Page renders', () => {
      // Router is required in order to render Link tags (within LogEntry rendered/called by Log)
      const raw = TestRenderer.create(
        <Router>
          <Log user={userProps} updateUserState={() => {}} />
        </Router>
      )
      const tree = raw.toTree()
      expect(tree.instance).not.toBe(null)
      expect(tree.props.children.props.user).toEqual(userProps)
      expect(raw.toJSON().children[0].children[0]).toEqual('Service History')
    })

    xit('** Wrapped in a ProtectedRoute HOC -> <Log withUser /> renders the Log Page', () => {
      const context = { user: userProps, updateUserState: (val) => user = val }
      // const userContext = React.createContext({
      //   user: userProps,
      //   updateUserState: () => {}
      // })

      jest.mock('react', () => ({
        // ...jest.requireActual('react-router-dom'),
        useContext: (context) => ({
          user: {
            "cookies": "abc123",
            "email": "email@address.com",
            "log": [{"_id": 0},{"_id": 1}],
            "name": "username",
            "vehicle": [{"vehicle0": {}}]
          },
          updateUserState: () => { return console.log('UUS') }
        })
      }))

      const raw = TestRenderer.create(
        <Router>
          <ProtectedRoute path="/log" exact component={Log} user={userProps} updateUserState={() => {}} />
        </Router>
      )

      console.log(raw.root)
      // console.log(tree.instance.history)
      // expect(tree.instance.history.location.pathname).toBe('/welcome')
      // expect(tree.instance.history.action).toBe('POP')
      // expect(tree.rendered.rendered.rendered.props.path).toBe('/log')
      // expect(tree.rendered.rendered.props.path).toEqual('/log')
      // expect(tree.rendered.rendered.rendered.props.render().props.user).toEqual(userProps)
      // console.log(tree.rendered.rendered.rendered.instance.props.render())
    })
  })
})
