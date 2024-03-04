import * as React from 'react'
import {render, within} from '@testing-library/react'
import {Modal} from '../modal'

test('modal shows the children', () => {
  render(
    <div className="myPage">
      <div role="alert">My pagemessage</div>
      <Modal>
        <div role="alert">My message</div>
      </Modal>
    </div>,
  )
  const {getByRole} = within(document.getElementById('modal-root'))
  expect(getByRole('alert')).toHaveTextContent(/My message/i)
})
