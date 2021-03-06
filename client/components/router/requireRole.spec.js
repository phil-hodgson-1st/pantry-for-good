import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

import requireRole from './requireRole'
import Unauthorized from '../../modules/core/components/errors/Unauthorized'

Enzyme.configure({adapter: new Adapter()})

describe('ownerOrAdmin', function() {
  it('renders if role matches', function() {
    const enhanceMock = x => x
    requireRole.__Rewire__('enhance', enhanceMock)
    const wrappedComponent = () => null
    const Component = requireRole(['foo'])(wrappedComponent)
    const wrapper = shallow(<Component user={{roles: ['foo']}}/>)

    expect(wrapper.find(wrappedComponent)).to.be.present()
  })

  it('renders unauthorized', function() {
    const enhanceMock = x => x
    requireRole.__Rewire__('enhance', enhanceMock)
    const wrappedComponent = () => null
    const Component = requireRole(['foo'])(wrappedComponent)
    const wrapper = shallow(<Component user={{roles: ['bar']}}/>)

    expect(wrapper.find(Unauthorized)).to.be.present()
  })
})
