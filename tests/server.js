import {setupServer} from 'msw/node'
import {rest} from 'msw'

export const handlers = [
  rest.post('/greeting', (req, res, ctx) =>
    res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}})),
  ),
]

export const server = setupServer(...handlers)
