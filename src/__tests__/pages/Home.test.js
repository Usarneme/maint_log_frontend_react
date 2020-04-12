import React from 'react'
import Home from '../../pages/Home'
import renderer from 'react-test-renderer'

import AppRouter from '../../AppRouter'

describe('HOME PAGE', () => {
  describe('\tNot Logged In', () => {
    it('redirects to / route', () => {
      const tree = renderer.create(
        <AppRouter>
          <Home />
        </AppRouter>
        ).toJSON()
        // console.log(tree)
        // expect(tree[1].children[0].props.className).toEqual('guest__options')
        expect(tree).toMatchSnapshot()
    })
  })
})