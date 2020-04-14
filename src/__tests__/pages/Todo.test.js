import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import TestRenderer from 'react-test-renderer'

import ProtectedRoute from '../../components/ProtectedRoute'
import Todo from '../../pages/Todo'
import { userContext } from '../../contexts/userContext'

describe('TODO PAGE', () => {
  describe('* NOT LOGGED IN', () => {
    it('** Wrapped in a ProtectedRoute HOC -> <Todo /> redirects to /welcome', () => {
      const tree = TestRenderer.create(
        <Router>
          <userContext.Consumer>
          {({ user, updateUserState }) => 
            <ProtectedRoute path="/todo" exact component={Todo} />
          }
          </userContext.Consumer>
        </Router>
      ).toTree()
      expect(tree.rendered.props.history.action).toEqual('REPLACE')
      expect(tree.rendered.rendered.rendered.props.to).toEqual('/welcome')
    })

    it('** returns null if no user prop is passed', () => {
      const raw = TestRenderer.create(
        <Todo />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })

    it('** returns null if an empty user prop is passed', () => {
      const raw = TestRenderer.create(
        <Todo user={{}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })

    it('** returns null if a malformed user prop is passed', () => {
      const raw = TestRenderer.create(
        <Todo user={{ "log": []}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })

    it('** returns null if a randomly malformed user prop is passed', () => {
      const raw = TestRenderer.create(
        <Todo user={{ "blah": {}, "cookies": "", "otherkey": [1,2,3]}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })
  })

  const userProps = {
    "cookies": "abc123",
    "email": "email@address.com",
    "log": [{"_id": 0, "mileageDue": 1000000},{"_id": 1, "dateDue": 1588847069900}],
    "name": "username",
    "vehicle": [{"vehicle0": {}}]
  }

  describe('* LOGGED IN', () => {    
    it('** Renders the Todo Page', () => {
      // Router and Route components need to render Link tags within LogEntry within Todo
      const raw = TestRenderer.create(
        <Router>
          <Route path="/todo">
            <Todo user={userProps} />
          </Route>
        </Router>
      )
      const tree = raw.toTree()
      expect(tree.rendered.rendered.props.path).toEqual('/todo')
      expect(tree.rendered.rendered.props.children.props.user).toEqual(userProps)
      expect(tree.rendered.rendered.props.children.props.user.log[0]).toEqual(userProps.log[0])
    })
  })
})
