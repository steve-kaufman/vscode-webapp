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
      // arrange
      const { queryByTestId } = todo
      // act
      const title = queryByTestId('title')
      // assert
      expect(title).not.toBeNull()
    })
    it('Matches title in data prop', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      const title = queryByTestId('title')
      // assert
      expect(title.innerHTML).toBe(dummyData.title)
    })
  })

  describe('Description', () => {
    it('Exists', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      const description = queryByTestId('description')
      // assert
      expect(description).not.toBeNull()
    })
    it('Matches description in data prop', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      const description = queryByTestId('description')
      // assert
      expect(description.innerHTML).toBe(dummyData.description)
    })
  })

  describe('Checkbox', () => {
    it('Exists', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      const checkbox = queryByTestId('checkbox')
      // assert
      expect(checkbox).not.toBeNull()
    })
    // TODO names are backwards!!!
    it('Is not checked by default if completed is false', () => {
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
    it('Is checked by default if completed is true', () => {
      const { queryByTestId } = todo

      const checkbox = queryByTestId('checkbox')

      expect(checkbox.defaultChecked).toBe(false)
    })
    it('Calls setCompleted() when checked with true', () => {
      const { queryByTestId } = todo

      queryByTestId('checkbox').click()

      expect(setCompleted).toHaveBeenCalledTimes(1)
      expect(setCompleted).toHaveBeenCalledWith(dummyData.id, true)
    })
    it('Calls setComplete() when unchecked with false', () => {
      const completedIsTrue = { ...dummyData, completed: true }
      const { queryByTestId, rerender } = todo
      rerender(<Todo
        setCompleted={setCompleted}
        deleteTodo={deleteTodo}
        data={completedIsTrue}
      />)

      queryByTestId('checkbox').click()

      expect(setCompleted).toHaveBeenCalledTimes(1)
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
