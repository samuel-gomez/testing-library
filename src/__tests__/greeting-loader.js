import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import {GreetingLoader} from '../greeting-loader'
import {loadGreeting as mockLoadGreeting} from '../api'

// on mock tout le module de l'API
jest.mock('../api')

test('Loads greetings on click', async () => {
  const TEST_GREETING = 'test greeting'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: TEST_GREETING}})
  render(<GreetingLoader />)

  // pour récupérer un élément via le aria-label ou le label d'un champ on utilise getByLabelText
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load greeting/i)

  // on applique une valeur au champ
  nameInput.value = 'Mary'

  user.click(loadButton)

  // on vérifie si notre API a été appelé 1 fois et avec les bons arguments
  expect(mockLoadGreeting).toHaveBeenCalledWith(nameInput.value)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  await waitFor(() => {
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent(TEST_GREETING)
  })
})
