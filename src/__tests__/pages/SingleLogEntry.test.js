import React from 'react'
import SingleLogEntry from '../../pages/SingleLogEntry'
import renderer from 'react-test-renderer'

import AppRouter from '../../AppRouter'

describe('SINGLE LOG ENTRY PAGE', () => {
  describe('\tNot Logged In', () => {
    it('redirects to / route', () => {
      const tree = renderer.create(
        <AppRouter>
          <SingleLogEntry />
        </AppRouter>
        ).toJSON()
        // console.log(tree)
        // expect(tree[1].children[0].props.className).toEqual('guest__options')
        expect(tree).toMatchSnapshot()
    })
  })
})