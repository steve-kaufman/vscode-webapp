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
    const { getByTestId } = todoForm
    const titleInput = getByTestId('title')
    expect(titleInput).not.toBeNull()
  })
  it('Has a description input', () => {
    const { getByTestId } = todoForm
    const description = getByTestId('description')
    expect(description).not.toBeNull()
  })

  describe('Submit button', () => {
    it('Exists', () => {
      const { getByTestId } = todoForm
      const submit = getByTestId('submit-button')
      expect(submit).not.toBeNull()
    })

    it('Calls addTodo() once when clicked', () => {
      const { getByTestId } = todoForm

      getByTestId('title').value = 'foo'
      getByTestId('description').value = 'bar'
      getByTestId('submit-button').click()

      expect(addTodo).toHaveBeenCalledTimes(1)
      expect(addTodo).toHaveBeenCalledWith({
        title: 'foo', description: 'bar'
      })
    })
  })
})
