import React from 'react'
import GuestHome from '../../pages/GuestHome'
import TestRenderer from 'react-test-renderer'

describe('GUEST HOME PAGE.', () => {
  let raw

  beforeEach(() => {
    raw = TestRenderer.create(<GuestHome />)
  })

  it('Renders', () => {
    expect(raw.toJSON().children[0].props.className).toBe('card guest__options')
    expect(raw.toTree().rendered.rendered[0].props.className).toBe('card guest__options')
  })

  it('Uses the correct React Hooks (login showing state, user context, theme state, useEffect to get theme default from localStorage)', () => {
    expect(raw.root._fiber._debugHookTypes).toEqual(['useState','useContext','useState','useEffect'])
  })

  it('Contains the buttons to toggle display of Login and Register components', () => {
    expect(raw.toTree().rendered.props.children[0].props.children[0].props.className).toBe('button guest__option login guest__option__active')
    expect(raw.toTree().rendered.props.children[0].props.children[1].props.className.toString().trim()).toBe('button guest__option register')
  })

  it('Renders the Login child component by default', () => {
    expect(raw.toJSON().children[1].children[0].children[0]).toBe('Login')
  })

})
