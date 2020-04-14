import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import TestRenderer from 'react-test-renderer'
import routeData from 'react-router'

import Edit from '../../pages/Edit'

describe('EDIT PAGE', () => {
  describe('* Not Logged In', () => {
    it('** Responds with a redirect to /welcome', () => {
      const raw = TestRenderer.create(
        <Router>
          <Edit />
        </Router>
      )
      const tree = raw.toTree()
      // console.log(Object.keys(raw.toTree().instance))
      // console.log(raw.toTree().instance.props)
      expect(tree.rendered.props.history.action).toEqual('REPLACE')
      expect(tree.rendered.rendered.rendered.props.to).toEqual('/welcome')
    })
  })

  describe('* Logged In', () => {
    const mockLocation = {
      pathname: '/log/123abc/edit',
      hash: '',
      search: '',
      state: '',
      params: {
        'id': '123abc'
      }
    }
    // useParams() hook gets the ID of the log being edited from the url /log/:id/edit
    const spy = jest.spyOn(routeData, 'useParams').mockReturnValue(mockLocation)
    
    it('** Renders the Edit Page', () => {
      const userProps = {
        "cookies": "thisisarealcookie"
      }
      const matchProps = {
        "params": {
          "id": "123"
        },
        "path": "/log/:id/edit",
        "url": "/log/123abc/edit"
      }
      // console.log(Object.keys(spy))
      const tree = TestRenderer.create(<Edit user={userProps} match={matchProps} />).toTree()
      expect(tree.props.user).toEqual(userProps)
      expect(tree.props.match).toEqual(matchProps)
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })
})
