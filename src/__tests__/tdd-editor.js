import React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Editor} from '../tdd-editor'

test('Renders a form with title, content, tags, and a submit button', () => {
  render(<Editor />)
  screen.getByLabelText(/title/i)
  screen.getByLabelText(/content/i)
  screen.getByLabelText(/tags/i)

  const submitButton = screen.getByText(/submit/i)
  user.click(submitButton)
  expect(submitButton).toBeDisabled()
})
