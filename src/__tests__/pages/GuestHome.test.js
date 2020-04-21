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
  it('Renders the Login child component by default', () => {
    expect(raw.toJSON().children[1].children[0].children[0]).toBe('Login')
  })


  describe('Guest Home Buttons', () => {
    it('Contains the buttons to toggle display of Login and Register components', () => {
      expect(raw.toJSON().children[0].children.length).toEqual(2)
      expect(raw.toTree().rendered.props.children[0].props.children[0].props.className).toBe('button guest__option login guest__option__active')
      expect(raw.toTree().rendered.props.children[0].props.children[1].props.className).toBe('button guest__option register ')
    })
  
    it('Renders the button text', () => {
      expect(raw.toJSON().children[0].children[0].children[0].children[0]).toBe('Login & View Your Maintenance Log')
      expect(raw.toJSON().children[0].children[1].children[0].children[0]).toBe('Register & Start Your Maintenance Log')
    })

    it('Renders the button icon images using ReactSVG', () => {
      expect(raw.root.findByProps({ "aria-label": "Register Icon"})._fiber.elementType.name).toBe('ReactSVG')
      expect(raw.toTree().rendered.rendered[0].rendered[0].rendered[1].type.name).toBe('ReactSVG')
    })

    it('Renders the Register Component (and hides Login) when the Show Register button is clicked', () => {
      // initially the Login component is rendered by default
      expect(raw.toJSON().children[0].children[0].props.className).toEqual('button guest__option login guest__option__active')
      expect(raw.toJSON().children[0].children[1].props.className).toEqual('button guest__option register ')
      // clicking the Register Button hides Login and shows the Register component instead
      raw.root.findByProps({ className: "button guest__option register "}).props.onClick()
      expect(raw.toJSON().children[0].children[0].props.className).toEqual('button guest__option login ')
      expect(raw.toJSON().children[0].children[1].props.className).toEqual('button guest__option register guest__option__active')
    })    
  })
})
