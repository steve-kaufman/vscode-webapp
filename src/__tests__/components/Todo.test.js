import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Todo from '../../components/Todo'

afterEach(cleanup)

describe('Todo', () => {
  let todo = null
  let deleteTodo = null
  let setCompleted = null

  const dummyData = {
    id: 2, title: 'foo', description: 'bar', completed: false
  }

  beforeEach(() => {
    deleteTodo = jest.fn()
    setCompleted = jest.fn()
    todo = render(<Todo
      deleteTodo={deleteTodo}
      setCompleted={setCompleted}
      data={dummyData}
    />)
  })

  describe('Title', () => {
    it('Exists', () => {
      const { queryByTestId } = todo
      const title = queryByTestId('title')
      expect(title).not.toBeNull()
    })
    it('Matches title in data prop', () => {
      const { queryByTestId } = todo
      const title = queryByTestId('title')
      expect(title.innerHTML).toBe(dummyData.title)
    })
  })

  describe('Description', () => {
    it('Exists', () => {
      const { queryByTestId } = todo
      const description = queryByTestId('description')
      expect(description).not.toBeNull()
    })
    it('Matches description in data prop', () => {
      const { queryByTestId } = todo
      const description = queryByTestId('description')
      expect(description.innerHTML).toBe(dummyData.description)
    })
  })

  describe('Checkbox', () => {
    it('Exists', () => {
      const { queryByTestId } = todo
      const checkbox = queryByTestId('checkbox')
      expect(checkbox).not.toBeNull()
    })
    it('Is checked by default only if completed is true', () => {
      const { queryByTestId, rerender } = todo

      const checkbox = queryByTestId('checkbox')

      expect(checkbox.defaultChecked).toBe(false)

      const completedIsTrue = { ...dummyData, completed: true }
      rerender(<Todo
        deleteTodo={deleteTodo}
        setCompleted={setCompleted}
        data={completedIsTrue}
      />)

      expect(checkbox.defaultChecked).toBe(true)
    })
    it('Calls setCompleted() checked', () => {
      const { queryByTestId, rerender } = todo

      queryByTestId('checkbox').click()

      expect(setCompleted).toHaveBeenCalledTimes(1)
      expect(setCompleted).toHaveBeenCalledWith(dummyData.id, true)

      const completedIsTrue = { ...dummyData, completed: true }
      rerender(<Todo
        deleteTodo={deleteTodo}
        setCompleted={setCompleted}
        data={completedIsTrue}
      />)

      queryByTestId('checkbox').click()

      expect(setCompleted).toHaveBeenCalledTimes(2)
      expect(setCompleted).toHaveBeenCalledWith(dummyData.id, false)
    })
  })

  describe('Delete button', () => {
    it('Exists', () => {
      const { queryByTestId } = todo
      const deleteButton = queryByTestId('delete-button')
      expect(deleteButton).not.toBeNull()
    })
    it('Calls deleteSelf() when clicked', () => {
      const { queryByTestId } = todo
      queryByTestId('delete-button').click()
      expect(deleteTodo).toHaveBeenCalledTimes(1)
      expect(deleteTodo).toHaveBeenCalledWith(dummyData.id)
    })
  })
})
