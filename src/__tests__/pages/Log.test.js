import React from 'react'
import Log from '../../pages/Log'
import renderer from 'react-test-renderer'

import AppRouter from '../../AppRouter'

describe('LOG PAGE', () => {
  describe('\tNot Logged In', () => {
    it('redirects to / route', () => {
      const tree = renderer.create(
        <AppRouter>
          <Log />
        </AppRouter>
        ).toJSON()
        // console.log(tree)
        // expect(tree[1].children[0].props.className).toEqual('guest__options')
        expect(tree).toMatchSnapshot()
    })
  })
})