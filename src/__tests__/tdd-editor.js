import React from 'react'
import {render, screen} from '@testing-library/react'
import {Editor} from '../tdd-editor'

test('Renders a form with title, content, tags, and a submit button', () => {
  render(<Editor />)
  screen.getByLabelText(/title/i)
  screen.getByLabelText(/content/i)
  screen.getByLabelText(/tags/i)
  screen.getByText(/submit/i)
})
