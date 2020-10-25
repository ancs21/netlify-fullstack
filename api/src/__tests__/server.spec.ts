import 'jest'
import { createTestClient } from 'apollo-server-testing'

import { createLocalServer } from '../server'

// describe test cases
test.each`
  isbn            | expected
  ${'0552166596'} | ${[{ isbn: '0552166596', name: 'The Colour Of Magic' }]}
  ${'wrong isbn'} | ${[]}
  ${undefined}    | ${[{ isbn: '0552166596', name: 'The Colour Of Magic' }]}
`('books($isbn) = $expected', async ({ isbn, expected }) => {
  const server = createLocalServer()
  const { query } = createTestClient(server)

  // graphl query
  const parameters = isbn ? `(isbn: "${isbn}")` : ''
  const GET_BOOKS = `
  {
    books ${parameters} {
      isbn
      name
    }
  }
  `

  // act
  const response = await query({ query: GET_BOOKS })

  // assert
  expect(response.data.books).toEqual(expected)
})
