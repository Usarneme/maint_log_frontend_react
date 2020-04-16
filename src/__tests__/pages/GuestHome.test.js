import React from 'react'
import GuestHome from '../../pages/GuestHome'
import TestRenderer from 'react-test-renderer'

describe('GUEST HOME PAGE.', () => {
  describe('* NOT LOGGED IN.', () => {
    it('NO PROPS - Renders with PropTypes warnings', () => {
      const raw = TestRenderer.create(<GuestHome />)
      expect(raw.toJSON().children[0].props.className).toBe('card guest__options')
      expect(raw.toTree().instance.state.showLogin).toBeTruthy()
      expect(raw.toTree().instance.state.theme).not.toBe(null)
    })

    it('VALID PROPS - Renders without warnings', () => {
      const props = {
        user: {},
        updateUserState: () => {},
        history: {}
      }

      const raw = TestRenderer.create(<GuestHome {...props} />)
      expect(raw.root._fiber.stateNode.props).toEqual(props)
      expect(raw.toJSON().children[0].props.className).toBe('card guest__options')
      expect(raw.toTree().props).toEqual(props)
      expect(raw.toTree().instance.state.showLogin).toBeTruthy()
    })
  })
})
