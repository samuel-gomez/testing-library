import React from 'react'
import {render, screen} from '@testing-library/react'
import user from '@testing-library/user-event'
import {HiddenMessage} from '../hidden-message'

jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props) => (props.in ? props.children : null),
  }
})

test('Show hidden message when toggle is clicked', () => {
  const message = 'Hello'
  render(<HiddenMessage>{message}</HiddenMessage>)

  const toggleButton = screen.getByText(/toggle/i)

  // given
  expect(screen.queryByText(message)).not.toBeInTheDocument()

  // when
  user.click(toggleButton)

  // then
  expect(screen.getByText(message)).toBeInTheDocument()

  // when
  user.click(toggleButton)

  // then

  expect(screen.queryByText(message)).not.toBeInTheDocument()
})
