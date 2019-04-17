/* globals describe, it, afterEach */
import React from 'react'
import { cleanup, render } from 'react-testing-library'

import ___titleCase___ from './___titleCase___.js'

describe('___titleCase___', () => {
  afterEach(cleanup)

  it('should have a header with new message', () => {
    const message = 'hello new component!!'
    const { getByText } = render(<___titleCase___ message={message}></___titleCase___>)
    getByText(message)
  })
})
