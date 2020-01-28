import React from 'react'
import { render, cleanup } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

describe('App', () => {
  let app = null

  const mockFetch = 

  afterEach(cleanup)

  beforeEach(() => {
    app = render(<App />)
  })

  it('Has <header>', () => {
    // arrange
    const { container } = app
    // act
    const header = container.querySelector('header')
    // assert
    expect(header).not.toBeNull()
  })
  it('Has <main>', () => {
    // arrange
    const { container } = app
    // act
    const main = container.querySelector('main')
    // assert
    expect(main).not.toBeNull()
  })
  it('Has <footer>', () => {
    // arrange
    const { container } = app
    // act
    const footer = container.querySelector('footer')
    // assert
    expect(footer).not.toBeNull()
  })

  it('Gets todos from REST API', () => {
    // arrange
    const { unmount } = app
    unmount()
    const fakeTodos = [
      { id: 0, title: 'title1', description: 'description1', completed: false },
      { id: 1, title: 'title2', description: 'description2', completed: true }
    ]
    const mockFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeTodos)
      })
    })
    mockFetch.mockClear()
    // act
    render(<App />)
    // assert
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  describe('addTodo()', () => {
    it('Calls fetch()', () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      const fakeTodo = { title: 'foo', description: 'bar' }
      const mockFetch = jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
        return Promise.resolve({
          json: () => Promise.resolve(fakeTodo)
        })
      })
      mockFetch.mockClear()
      // act
      app.addTodo(fakeTodo)
      // assert
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
    // TODO test addTodo()
    it('Adds a todo to the TodoList', () => {
      // arrange
      // act
      // assert
    })
  })
})
