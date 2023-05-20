import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import {Redirect as MockRedirect} from 'react-router'
import {Editor} from '../tdd-editor'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

const creationDate = new Date()
const fakePost = {
  title: 'Test title',
  content: 'Test content',
  tags: 'tag1, tag2',
  id: '123456',
}
const fakeUser = {
  userId: 'Test user id',
}
const useIdMock = jest.fn().mockReturnValueOnce(fakePost.id)

const renderEditor = () => {
  render(<Editor {...fakeUser} useId={useIdMock} date={creationDate} />)
  screen.getByLabelText(/content/i).value = fakePost.content
  screen.getByLabelText(/tags/i).value = fakePost.tags

  const submitButton = screen.getByText(/submit/i)

  return {
    submitButton,
  }
}

test('Renders a form with title, content, tags, and a submit button and redirect', async () => {
  const {submitButton} = renderEditor()
  screen.getByLabelText(/title/i).value = fakePost.title

  user.click(submitButton)
  expect(submitButton).toBeDisabled()

  await waitFor(() => {
    expect(screen.getByText(fakePost.title)).toBeInTheDocument()
  })

  expect(screen.getByText(fakePost.content)).toBeInTheDocument()
  expect(screen.getByText(fakePost.tags)).toBeInTheDocument()
  expect(screen.getByText(fakePost.id)).toBeInTheDocument()
  expect(screen.getByText(fakeUser.userId)).toBeInTheDocument()
  expect(screen.getByText(creationDate.toISOString())).toBeInTheDocument()

  await waitFor(() => {
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
  })
})

test('Renders a error message from the server when title is empty', async () => {
  const {submitButton} = renderEditor()
  screen.getByLabelText(/title/i).value = ''
  user.click(submitButton)

  const postError = await screen.findByRole('alert')
  expect(postError).toHaveTextContent(
    /Format invalide, veuillez renseigner le titre/i,
  )
  expect(submitButton).toBeEnabled()
})
