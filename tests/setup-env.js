import 'whatwg-fetch'
import '@testing-library/jest-dom/extend-expect'
import 'jest-axe/extend-expect'
import {server} from './server'

beforeAll(() => server.listen({onUnhandledRequest: 'error'}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
