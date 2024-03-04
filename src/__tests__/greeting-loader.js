import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import {GreetingLoader} from '../greeting-loader'

test('Loads greetings on click', async () => {
  render(<GreetingLoader />)
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load greeting/i)
  nameInput.value = 'Mary'
  user.click(loadButton)
  await waitFor(() => {
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent('Hello Mary')
  })
})
