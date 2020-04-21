import React from 'react'
import TestRenderer from 'react-test-renderer'

import Add from '../../pages/Add'

describe('ADD PAGE', () => {
  let raw
  const props = {
    "history": {},
    "user": {},
    "updateUserState": () => {}
  }
  beforeEach(() => {
    raw = TestRenderer.create(<Add {...props} />)
  })

  it('** Renders the Add Page', () => {
    expect(raw.toJSON().children[0].children[0]).toEqual('Add New Log Entry')
    expect(raw.root._fiber.type.name).toBe('Add')
    expect(raw.toTree().type.name).toBe('Add')
  })

  it('** Has a child LogForm component', () => {
    expect(raw.toJSON().children[1].props.id).toBe('logForm')
  })

  it('** Contains the correct props', () => {
    expect(raw.toTree().props).toStrictEqual(props)
    expect(raw.toTree().rendered.props).toStrictEqual(props)
  })

  it('** Passes the correct props to children', () => {
    expect(raw.toTree().rendered.instance.props).toStrictEqual(props)
  })
})


// toTree() -> nodeType, type, props, instance, rendered
// toJSON() -> type, props, children
// raw -> root, toJSON, toTree, update, unmount, getInstance
// raw.root._fiber -> tag, key, elementType, type, stateNode, return, child, sibling, index, ref, effectTag, alternate
// raw.root._fiber.return.stateNode.context