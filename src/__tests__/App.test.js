import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

afterEach(cleanup)

describe('App', () => {
  it('Has <header>', () => {
    const { container } = render(<App />)
    const header = container.querySelector('header')
    expect(header).not.toBeNull()
  })
  it('Has <main>', () => {
    const { container } = render(<App />)
    const main = container.querySelector('main')
    expect(main).not.toBeNull()
  })
  it('Has <footer>', () => {
    const { container } = render(<App />)
    const footer = container.querySelector('footer')
    expect(footer).not.toBeNull()
  })

  describe('addTodo()', () => {
    it('Calls fetch()', () => {
      const fakeTodo = { title: 'foo', description: 'bar' }
      const mockFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
          json: () => Promise.resolve(fakeTodo)
        })
      })

      const app = new App()
      app.addTodo(fakeTodo)

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
    it('Adds a todo to the TodoList', () => {

    })
  })
})
