import * as React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {FavoriteNumber} from '../favorite-number'

test('Render a number input with a label Favorite Number', () => {
  render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})

test('Entering an invalid value shows an error message', () => {
  const {rerender} = render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(screen.getByRole('alert')).toHaveTextContent(/The number is invalid/i)
  rerender(<FavoriteNumber max={10} />)
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})
