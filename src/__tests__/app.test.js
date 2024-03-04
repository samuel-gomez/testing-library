import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app'

//Le test 1 se trouve dans le main
//TEST 2
test('Un titre welcome home est présent dans le document', () => {
  render(<App />)
  const titleElement = screen.queryByText(/Welcome home/i)
  expect(titleElement).toBeInTheDocument()
})

//TEST 2 non passant
test('Un titre welcome home nest pas present', () => {
  window.history.pushState({}, 'Page 2', '/page-2')
  render(<App />)
  const titleElement = screen.queryByText(/Welcome home/i)
  expect(titleElement).not.toBeInTheDocument()
})

//TEST 3
test('Un lien Fill out the form est present dans le document', () => {
  window.history.pushState({}, 'Home', '/')
  render(<App />)
  const linkElement = screen.getByText(/Fill out the form/i)
  expect(linkElement).toBeInTheDocument()
})

// TEST 3 NON PASSANT
test('Un lien Fill out the form nest pas present dans le document', () => {
  window.history.pushState({}, 'Page 1', '/page-1')
  render(<App />)
  const linkElement = screen.queryByText(/Fill out the form/i)
  expect(linkElement).not.toBeInTheDocument()
})

test('Cas passant', () => {
  window.history.pushState({}, 'Home', '/')
  render(<App />)

  //TEST 4
  userEvent.click(screen.getByText(/Fill out the form/i))

  // TEST 5-6
  expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i)

  //TEST 7
  const linkElement = screen.getByText(/Go Home/i)
  expect(linkElement).toBeInTheDocument()

  //TEST 8
  expect(screen.getByLabelText(/Favorite food/i)).toBeInTheDocument()

  //TEST 9
  const input = screen.getByLabelText(/Favorite food/i)
  userEvent.type(input, 'Les pâtes')

  //TEST 10
  const linknext = screen.getByText(/Next/i)
  expect(linknext).toBeInTheDocument()

  //Test 11-12-13
  userEvent.click(screen.getByText(/next/i)) //11
  expect(screen.getByRole('heading')).toHaveTextContent(/page 2/i) //12-13

  //Test 14
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()

  //Test 15
  expect(screen.getByLabelText(/Favorite drink/i)).toBeInTheDocument()

  //Test 16
  const favoriteDrinkInput = screen.getByLabelText(/Favorite drink/i)
  userEvent.type(favoriteDrinkInput, 'Bière')
  expect(favoriteDrinkInput).toHaveValue('Bière')

  //Test 17
  expect(screen.getByText(/Review/i)).toBeInTheDocument()

  //Test 18
  userEvent.click(screen.getByText(/review/i))

  //Test 19-20
  expect(screen.getByRole('heading')).toHaveTextContent(/confirm/i)

  //Test 21
  expect(screen.getByText(/Please confirm your choices/i)).toBeInTheDocument()

  //Test 22
  expect(screen.getByLabelText(/Favorite food/i)).toHaveTextContent('Les pâtes')
  //Test 23
  expect(screen.getByLabelText(/Favorite drink/i)).toHaveTextContent('Bière')
  //Test 24
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()
  //Test 25
  const button1 = screen.getByRole('button', {name: /Confirm/i})
  expect(button1).toHaveTextContent(/Confirm/i)
  //Test 26
  userEvent.click(button1)
  // 27 - l'utilisateur est redirigé sur la page de Félicitation

  //TEST 28
  //await waitFor(() => screen.queryByRole('heading')).toHaveTextContent(/Congrats.You did it./i);

  //expect(screen.getByRole('heading')).toHaveTextContent(/Congrats.You did it./i)

  //TEST 29
  //expect(screen.getByText(/Go home/i)).toBeInTheDocument()

  //TEST 30
  //userEvent.click(screen.getByText(/Go Home/i))

  //TEST 31-32
  // expect(screen.getByText(/Welcome home/i)).toBeInTheDocument()
})

test('Cas non passant', () => {
  window.history.pushState({}, 'Home', '/')
  render(<App />)

  //TEST 4
  userEvent.click(screen.getByText(/Fill out the form/i))

  // TEST 5-6
  expect(screen.getByRole('heading')).toHaveTextContent(/page 1/i)

  //TEST 7
  const linkElement = screen.getByText(/Go Home/i)
  expect(linkElement).toBeInTheDocument()

  //TEST 8
  expect(screen.getByLabelText(/Favorite food/i)).toBeInTheDocument()

  //TEST 9
  const input = screen.getByLabelText(/Favorite food/i)
  userEvent.type(input, '')
  expect(input).toHaveValue('')

  //TEST 10
  const linknext = screen.getByText(/Next/i)
  expect(linknext).toBeInTheDocument()

  //Test 11-12-13
  userEvent.click(screen.getByText(/next/i)) //11
  expect(screen.getByRole('heading')).toHaveTextContent(/page 2/i) //12-13

  //Test 14
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()

  //Test 15
  expect(screen.getByLabelText(/Favorite drink/i)).toBeInTheDocument()

  //Test 16
  const favoriteDrinkInput = screen.getByLabelText(/Favorite drink/i)
  userEvent.type(favoriteDrinkInput, 'Bière')
  expect(favoriteDrinkInput).toHaveValue('Bière')

  //Test 17
  expect(screen.getByText(/Review/i)).toBeInTheDocument()

  //Test 18
  userEvent.click(screen.getByText(/review/i))

  //Test 19-20
  expect(screen.getByRole('heading')).toHaveTextContent(/confirm/i)

  //Test 21
  expect(screen.getByText(/Please confirm your choices/i)).toBeInTheDocument()

  //Test 22
  expect(screen.getByLabelText(/Favorite food/i)).toHaveTextContent('')
  //Test 23
  expect(screen.getByLabelText(/Favorite drink/i)).toHaveTextContent('Bière')
  //Test 24
  expect(screen.getByText(/Go back/i)).toBeInTheDocument()
  //Test 25
  const button1 = screen.getByRole('button', {name: /Confirm/i})
  expect(button1).toHaveTextContent(/Confirm/i)
  //Test 26
  userEvent.click(button1)
  // 27 - l'utilisateur est redirigé sur la page de Félicitation

  //TEST 28
  //await waitFor(() => screen.queryByRole('heading')).toHaveTextContent(/Congrats.You did it./i);

  //expect(screen.getByRole('heading')).toHaveTextContent(/Congrats.You did it./i)

  //TEST 29
  //expect(screen.getByText(/Go home/i)).toBeInTheDocument()

  //TEST 30
  //userEvent.click(screen.getByText(/Go Home/i))

  //TEST 31-32
  // expect(screen.getByText(/Welcome home/i)).toBeInTheDocument()
})
