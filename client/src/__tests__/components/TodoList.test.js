import React from 'react'
import { render, cleanup, queryAllByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TodoList from '../../components/TodoList'

describe('TodoList', () => {
  let todoList = null
  let deleteTodo = null
  let setCompleted = null
  const fakeTodos = [
    { id: 0, title: 'title1', description: 'description1', completed: false },
    { id: 1, title: 'title2', description: 'description2', completed: true }
  ]

  afterEach(cleanup)

  beforeEach(() => {
    deleteTodo = jest.fn()
    setCompleted = jest.fn()
    todoList = render(<TodoList
      deleteTodo={deleteTodo}
      setCompleted={setCompleted}
      todos={fakeTodos}
    />)
  })

  it('Has todos', () => {
    // arrange
    const { queryAllByTestId } = todoList
    // act
    const todos = queryAllByTestId('todo')
    // assert
    expect(todos).not.toBeNull()
  })
  it('Matches given array of todos', () => {
    // arrange
    const { queryAllByTestId } = todoList
    // act
    const todoElements = queryAllByTestId('todo')
    const titles = queryAllByTestId('title').map(title => title.innerHTML)
    const descriptions =
      queryAllByTestId('description').map(descr => descr.innerHTML)
    // assert
    expect(todoElements.length).toBe(2)
    expect(titles).toEqual(['title1', 'title2'])
    expect(descriptions).toEqual(['description1', 'description2'])
  })
  it('Passes deleteTodo and setCompleted to todos', () => {
    // arrange
    const { queryAllByTestId } = todoList
    // act
    queryAllByTestId('checkbox')[0].click()
    queryAllByTestId('checkbox')[1].click()
    queryAllByTestId('delete-button')[0].click()
    queryAllByTestId('delete-button')[1].click()
    // assert
    expect(setCompleted).toHaveBeenCalledTimes(2)
    expect(setCompleted).toHaveBeenCalledWith(0, true)
    expect(setCompleted).toHaveBeenCalledWith(1, false)
    expect(deleteTodo).toHaveBeenCalledTimes(2)
    expect(deleteTodo).toHaveBeenCalledWith(0)
    expect(deleteTodo).toHaveBeenCalledWith(1)
  })
})
