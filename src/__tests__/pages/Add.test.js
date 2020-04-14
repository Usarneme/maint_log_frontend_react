import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import TestRenderer from 'react-test-renderer'

import Add from '../../pages/Add'

describe('\ADD PAGE', () => {
  describe('* Not Logged In', () => {
  it('** Responds with a redirect to /welcome', () => {
      const tree = TestRenderer.create(
        <Router>
          <Add />
        </Router>
      ).toTree()
      expect(tree.rendered.props.history.action).toEqual('REPLACE')
      expect(tree.rendered.rendered.rendered.props.to).toEqual('/welcome')
    })
  })
  describe('* Logged In', () => {
    it('** Renders the Add Page', () => {
      const userProps = {
        "cookies": "thisisarealcookie"
      }
      const raw = TestRenderer.create(<Add user={userProps} />)
      const tree = raw.toTree()

      expect(raw.toJSON().children[0].children[0]).toEqual('Add New Log Entry')
      expect(tree.props).toEqual({ "user": userProps })
      expect(tree.props.user).toEqual(userProps)
    })
  })
})