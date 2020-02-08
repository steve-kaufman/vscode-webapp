import React from 'react'
import { render, cleanup } from '@testing-library/react'
import TestRenderer from 'react-test-renderer'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'
import API from '../api'

jest.mock('../api')

describe('App', () => {
  let app = null

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
  it('Has <Header />', () => {
    // arrange
    const { queryByTestId } = app
    // act
    const header = queryByTestId('header')
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

  it('Has a TodoForm', () => {
    // arrange
    const { queryByTestId } = app
    // act
    const todoForm = queryByTestId('todoForm')
    // assert
    expect(todoForm).not.toBeNull()
  })
  it('Has a TodoList', () => {
    // arrange
    const { queryByTestId } = app
    // act
    const todoList = queryByTestId('todoList')
    // assert
    expect(todoList).not.toBeNull()
  })

  describe('loadTodos()', () => {
    it('Exists', () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      // act
      const { loadTodos } = app
      // assert
      expect(loadTodos).toBeTruthy()
    })
    it('Gets todos from API', async () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      const mockService = jest.spyOn(API, 'service')
      mockService.mockClear()
      API.find.mockClear()
      // act
      await app.loadTodos()
      // assert
      expect(mockService).toHaveBeenCalledTimes(1)
      expect(mockService).toHaveBeenCalledWith('todos')
      expect(API.find).toHaveBeenCalledTimes(1)
      expect(app.state.todos).toEqual(API.fakeTodoList)
    })
  })

  describe('addTodo()', () => {
    it('Exists', () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      // act
      const { addTodo } = app
      // assert
      expect(addTodo).toBeTruthy()
    })
    it('Calls API to create todo and adds a todo to its state', async () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      const fakeTodo = { title: 'foo', description: 'bar', completed: false }
      const mockCreateFn = jest.fn(() => Promise.resolve({ ...fakeTodo, id: 7 }))
      const mockService = jest.spyOn(API, 'service').mockImplementationOnce(() => ({
        create: mockCreateFn
      }))
      mockService.mockClear()
      // act
      await app.addTodo(fakeTodo)
      // assert
      expect(mockService).toHaveBeenCalledTimes(1)
      expect(mockService).toHaveBeenCalledWith('todos')
      expect(mockCreateFn).toHaveBeenCalledTimes(1)
      expect(mockCreateFn).toHaveBeenCalledWith(fakeTodo)
      expect(app.state.todos).toContainEqual({ ...fakeTodo, id: 7 })
    })
  })

  describe('deleteTodo()', () => {
    it('Exists', () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      // act
      const { deleteTodo } = app
      // assert
      expect(deleteTodo).toBeTruthy()
    })
    it('Calls API to delete todo and removes todo from its state', async () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      const mockService = jest.spyOn(API, 'service')
      mockService.mockClear()
      // act
      await app.deleteTodo(7)
      // assert
      expect(mockService).toHaveBeenCalledTimes(1)
      expect(mockService).toHaveBeenCalledWith('todos')
      expect(API.remove).toHaveBeenCalledTimes(1)
      expect(API.remove).toHaveBeenCalledWith(7)
      expect(app.state.todos).not.toContainEqual(API.fakeTodoList[0])
    })
  })

  describe('setCompleted()', () => {
    it('Exists', () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      // act
      const { setCompleted } = app
      // assert
      expect(setCompleted).toBeTruthy()
    })
    it('Calls API to patch todo and updates todo in state', async () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      const mockService = jest.spyOn(API, 'service')
      mockService.mockClear()
      // act
      await app.loadTodos()
      await app.setCompleted(7, true)
      // assert
      expect(mockService).toHaveBeenCalledTimes(2)
      expect(mockService).toHaveBeenCalledWith('todos')
      expect(API.patch).toHaveBeenCalledTimes(1)
      expect(API.patch).toHaveBeenCalledWith(7, { completed: true })
      expect(app.state.todos).toContainEqual({
        ...API.fakeTodoList[0],
        completed: true
      })
    })
  })

  describe('signIn()', () => {
    it('Exists', () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      // act
      const { signIn } = app
      // assert
      expect(signIn).toBeTruthy()
    })
    it('Calls API.authenticate()', () => {
      // arrange
      app = TestRenderer.create(<App />).getInstance()
      // act
      app.signIn('user@example.com', '1234')
      // assert
      expect(API.authenticate).toHaveBeenCalledTimes(1)
      expect(API.authenticate).toHaveBeenCalledWith({
        strategy: 'local',
        email: 'user@example.com',
        password: '1234'
      })
    })
  })
})
