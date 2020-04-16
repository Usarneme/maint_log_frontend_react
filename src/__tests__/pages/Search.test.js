import React from 'react'
import TestRenderer from 'react-test-renderer'

import Search from '../../pages/Search'

describe('SEARCH PAGE', () => {
  describe('* NOT LOGGED IN', () => {
    it('** returns null if no user prop is passed', () => {
      const raw = TestRenderer.create(
        <Search />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
    })

    it('** returns null if an empty user prop is passed', () => {
      const raw = TestRenderer.create(
        <Search user={{}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
      expect(raw.root._fiber.child).toBe(null)
    })

    it('** returns null if a malformed user prop is passed', () => {
      const raw = TestRenderer.create(
        <Search user={{ "blog": []}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
      expect(raw.root._fiber.child).toBe(null)
    })

    it('** returns null if a randomly malformed user prop is passed', () => {
      const raw = TestRenderer.create(
        <Search user={{ "blah": {}, "cookies": "", "otherkey": [1,2,3]}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
      expect(raw.root._fiber.child).toBe(null)
    })

    it('** returns null if a user prop with valid but empty properties is passed', () => {
      const raw = TestRenderer.create(
        <Search user={{ "cookies": "", "log": [], "email": "", "name": "", "userID": "", "sessionID": "", "vehicle": []}} />
      )
      const tree = raw.toTree()
      expect(tree.rendered).toBe(null)
      expect(tree.instance).toBe(null)
      expect(raw.root._fiber.child).toBe(null)
    })
  })
  describe('* LOGGED IN', () => {
    const userProps = {
      "cookies": "abc123",
      "email": "email@address.com",
      "log": [{"_id": 0},{"_id": 1}],
      "name": "username",
      "vehicle": [{"vehicle0": {}}],
      "sessionID": "sessionIDblahblah",
      "userID": "userIDblahblahblah"
    }
    it('should render correctly with a proper user object passed as props', () => {
      const raw = TestRenderer.create(
        <Search user={userProps} />
      )
      expect(raw.toTree().rendered).not.toBe(null)
      expect(raw.root._fiber.child).not.toBe(null)
      expect(raw.root._fiber.child.stateNode.props.className).toBe('inner')
    })
  })
})