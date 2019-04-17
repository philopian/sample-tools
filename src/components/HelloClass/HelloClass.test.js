/* globals describe, it, afterEach */
import React from 'react'
import { cleanup, render } from 'react-testing-library'

import HelloClass from './HelloClass.js'

describe('HelloClass', () => {
  afterEach(cleanup)

  it('should have a header with new message', () => {
    const message = 'hello new component!!'
    const { getByText } = render(<HelloClass message={message}></HelloClass>)
    getByText(message)
  })
})
