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
    it('Is checked by default if completed is true', () => {
      // arrange
      const { queryByTestId, rerender } = todo
      const completedIsTrue = { ...dummyData, completed: true }
      rerender(<Todo
        deleteTodo={deleteTodo}
        setCompleted={setCompleted}
        data={completedIsTrue}
      />)
      // act
      const checkbox = queryByTestId('checkbox')
      // assert
      expect(checkbox.defaultChecked).toBe(true)
    })
    it('Is not checked by default if completed is false', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      const checkbox = queryByTestId('checkbox')
      // assert
      expect(checkbox.defaultChecked).toBe(false)
    })
    it('Calls setCompleted() when checked with true', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      queryByTestId('checkbox').click()
      // assert
      expect(setCompleted).toHaveBeenCalledTimes(1)
      expect(setCompleted).toHaveBeenCalledWith(dummyData.id, true)
    })
    it('Calls setComplete() when unchecked with false', () => {
      // arrange
      const { queryByTestId, rerender } = todo
      const completedIsTrue = { ...dummyData, completed: true }
      rerender(<Todo
        setCompleted={setCompleted}
        deleteTodo={deleteTodo}
        data={completedIsTrue}
      />)
      // act
      queryByTestId('checkbox').click()
      // assert
      expect(setCompleted).toHaveBeenCalledTimes(1)
      expect(setCompleted).toHaveBeenCalledWith(dummyData.id, false)
    })
  })

  describe('Delete button', () => {
    it('Exists', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      const deleteButton = queryByTestId('delete-button')
      // assert
      expect(deleteButton).not.toBeNull()
    })
    it('Calls deleteSelf() when clicked', () => {
      // arrange
      const { queryByTestId } = todo
      // act
      queryByTestId('delete-button').click()
      // assert
      expect(deleteTodo).toHaveBeenCalledTimes(1)
      expect(deleteTodo).toHaveBeenCalledWith(dummyData.id)
    })
  })
})
