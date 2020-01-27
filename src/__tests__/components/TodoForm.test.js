import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TodoForm from '../../components/TodoForm'

describe('TodoForm', () => {
  let addTodo = null
  let todoForm = null

  afterEach(cleanup)

  beforeEach(() => {
    addTodo = jest.fn()
    todoForm = render(<TodoForm addTodo={addTodo} />)
  })

  it('Has a title input', () => {
    // arrange
    const { getByTestId } = todoForm
    // act
    const titleInput = getByTestId('title')
    // assert
    expect(titleInput).not.toBeNull()
  })
  it('Has a description input', () => {
    // arrange
    const { getByTestId } = todoForm
    // act
    const description = getByTestId('description')
    // assert
    expect(description).not.toBeNull()
  })

  describe('Submit button', () => {
    it('Exists', () => {
      // arrange
      const { getByTestId } = todoForm
      // act
      const submit = getByTestId('submit-button')
      // assert
      expect(submit).not.toBeNull()
    })

    it('Calls addTodo() once when clicked', () => {
      // arrange
      const { getByTestId } = todoForm

      // act
      getByTestId('title').value = 'foo'
      getByTestId('description').value = 'bar'
      getByTestId('submit-button').click()

      // assert
      expect(addTodo).toHaveBeenCalledTimes(1)
      expect(addTodo).toHaveBeenCalledWith({
        title: 'foo', description: 'bar'
      })
    })
  })
})
