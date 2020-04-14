import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TestRenderer from 'react-test-renderer'
import renderer from 'react-test-renderer'

import ProtectedRoute from '../../components/ProtectedRoute'
import Log from '../../pages/Log'
import { userContext } from '../../contexts/userContext'

describe('LOG PAGE', () => {
  const userProps = {
    "cookies": "abc123",
    "email": "email@address.com",
    "log": [{"_id": 0},{"_id": 1}],
    "name": "username",
    "vehicle": [{"vehicle0": {}}]
  }

  describe('* NOT LOGGED IN', () => {
    it('** w/Routing and Context HOCs. Log called without user or updateUserState props redirects to /welcome', () => {
      const context = { user: {}, updateUserState: () => {} }

      const tree = renderer.create(
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

      const raw = renderer.create(
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

    it('** returns null if a malformed user prop is passed', () => {
      const raw = TestRenderer.create(
        <Log user={{ "log": []}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })

    it('** returns null if a randomly malformed user prop is passed', () => {
      const raw = TestRenderer.create(
        <Log user={{ "blah": {}, "cookies": "", "otherkey": [1,2,3]}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })
  })

  describe('* LOGGED IN', () => {    
    it('** Log called with user and updateUserState props renders the Log Page', () => {
      const json = TestRenderer.create(<Router><Log user={userProps} updateUserState={() => {}} /></Router>).toJSON()
      expect(json.children[0].children[0]).toEqual('Service History')
    })

    it('** Renders the Log Page', () => {
      // Router and Route components needed to render Link tags within LogEntry within Log
      const raw = TestRenderer.create(
        <Router>
          <Route path="/log">
            <Log user={userProps} />
          </Route>
        </Router>
      )
      const tree = raw.toTree()
      expect(tree.rendered.rendered.props.path).toEqual('/log')
      expect(tree.rendered.rendered.props.children.props.user).toEqual(userProps)
    })

    it('** Wrapped in a ProtectedRoute HOC -> <Log withUser /> renders the Log Page', () => {
      let user = {...userProps}
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
      expect(tree.instance.history.location.pathname).toBe('/welcome')
      expect(tree.instance.history.action).toBe('POP')
      expect(tree.rendered.rendered.rendered.props.path).toBe('/log')
      expect(tree.rendered.rendered.props.path).toEqual('/log')
      expect(tree.rendered.rendered.rendered.props.render().props.user).toEqual(userProps)
      // console.log(tree.rendered.rendered.rendered.instance.props.render())
    })
  })
})
