import React from 'react'
import 'whatwg-fetch'
import {render, screen, waitFor} from '@testing-library/react'
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import user from '@testing-library/user-event'
import {GreetingLoader} from '../greeting-loader'

// on créé notre serveur
// on définit le endpoint que l'on cherche à intercepter
// la fonction de callback reçoit la requête avec les données envoyées
// on retourne une réponse au format json en étant fidèle à l'API
const server = setupServer(
  rest.post('/greeting', (req, res, ctx) => {
    return res(ctx.json({data: {greeting: `Hello ${req.body.subject}`}}))
  }),
)

// Avant les tests, on déclenche le serveur d'écoute qui interceptera toutes les requêtes HTTP
// en cas d'erreurs de frappe ou d'appels non souhaités, on affiche une erreur avec onUnhandledRequest
beforeAll(() => server.listen({onUnhandledRequest: 'error'}))

// on éteint le serveur après les tests
afterAll(() => server.close())

// Après chaque test, si d'autres handlers sont ajoutés, ils seront réinitialisés
afterEach(() => server.resetHandlers())

test('Loads greetings on click', async () => {
  render(<GreetingLoader />)

  // pour récupérer un élément via le aria-label ou le label d'un champ on utilise getByLabelText
  const nameInput = screen.getByLabelText(/name/i)
  const loadButton = screen.getByText(/load greeting/i)

  // on applique une valeur au champ
  nameInput.value = 'Mary'

  user.click(loadButton)

  await waitFor(() => {
    expect(screen.getByLabelText(/greeting/i)).toHaveTextContent('Hello Mary')
  })
})
