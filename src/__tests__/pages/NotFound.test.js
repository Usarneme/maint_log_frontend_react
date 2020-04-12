import React from 'react'
import NotFound from '../../pages/NotFound'
import renderer from 'react-test-renderer'

import AppRouter from '../../AppRouter'

describe('\tNotFound Page Testing', () => {
  it('redirects to / route', () => {
    const tree = renderer.create(
      <AppRouter>
        <NotFound />
      </AppRouter>
      ).toJSON()
      // expect(tree[1].children[0].props.className).toEqual('guest__options')
      expect(tree).toMatchSnapshot()
  })
})