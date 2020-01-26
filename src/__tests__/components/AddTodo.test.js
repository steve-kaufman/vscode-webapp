import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddTodo from '../../components/AddTodo'

//afterEach(cleanup)

describe("AddTodo", () => {
    const handleSubmit = jest.fn()

    it("Has a title input", () => {
        const { getByLabelText } = render(<AddTodo onSubmit={handleSubmit} />)
        const titleInput = getByLabelText(/title/i)
        expect(titleInput).not.toBeNull()
    })
    it("Has a description input", () => {
        const { getByLabelText } = render(<AddTodo onSubmit={handleSubmit} />)
        const description = getByLabelText(/description/i)
        expect(description).not.toBeNull()
    })
    it("Has a submit button", () => {
        const { getByText } = render(<AddTodo onSubmit={handleSubmit} />)
        const submit = getByText(/submit/i)
        expect(submit).not.toBeNull()
    })

    it("Calls onSubmit once with title and description as given", () => {
        const { getByLabelText, getByText } = render(<AddTodo onSubmit={handleSubmit} />)

        getByLabelText(/title/i).value = 'foo'
        getByLabelText(/description/i).value = 'bar'
        getByText(/submit/i).click()

        expect(handleSubmit).toHaveBeenCalledTimes(1)
        expect(handleSubmit).toHaveBeenCalledWith({
            title: 'foo', description: 'bar'
        })
    })
})