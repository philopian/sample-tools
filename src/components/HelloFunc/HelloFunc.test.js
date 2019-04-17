/* globals describe, it, afterEach */
import React from 'react'
import { cleanup, render } from 'react-testing-library'

import HelloFunc from './HelloFunc.js'

describe('HelloFunc', () => {
  afterEach(cleanup)

  it('should have a header with new message', () => {
    const message = 'hello new component!!'
    const { getByText } = render(<HelloFunc message={message}></HelloFunc>)
    getByText(message)
  })
})
