import React from 'react'
import GuestHome from '../../pages/GuestHome'
import renderer from 'react-test-renderer'

describe('GuestHome Page Testing.', () => {
  describe('\tNot Logged In.', () => {
  it('Renders', () => {
    const user = {}
    const updateUserState = () => {}
    const history = {}

    const tree = renderer.create(
      <GuestHome 
        user={user}
        updateUserState={updateUserState}
        history={history}
      />).toJSON()

      expect(tree).toMatchSnapshot()
    })
  })
})
