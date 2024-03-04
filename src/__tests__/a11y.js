import React from 'react'
import {render} from '@testing-library/react'
import {axe} from 'jest-axe'
import {Form} from '../a11y'

test('the form is accessible', async () => {
  const {container} = render(<Form />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
