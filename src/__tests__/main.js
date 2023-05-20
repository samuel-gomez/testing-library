import * as React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {render as renderRTL, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Main} from '../main'

function render(ui, {route = '/', ...options} = {}) {
  window.history.pushState({}, 'Test Page', route)

  const Wrapper = ({children}) => <BrowserRouter>{children}</BrowserRouter>
  return renderRTL(ui, {wrapper: Wrapper, ...options})
}

test('main renders about and home and I can navigate to those pages', () => {
  render(<Main />)
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i)
  userEvent.click(screen.getByText(/about/i))
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  render(<Main />, {route: '/something-that-does-not-match'})
  expect(screen.getByRole('heading')).toHaveTextContent(/404/i)
})
