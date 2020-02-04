import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignupForm from '../../components/SignupForm'

describe('SignupForm', () => {
  let signupForm = null

  afterEach(cleanup)

  beforeEach(() => {
    signupForm = render(<SignupForm />)
  })

  it('Renders', () => {
    expect(signupForm).toBeTruthy()
  })
  it('Has a test id of "signup-form"', () => {
    // arrange
    const { queryByTestId, container } = signupForm
    const expected = container.firstChild
    // act
    const actual = queryByTestId('signup-form')
    // assert
    expect(actual).not.toBeNull()
    expect(actual).toEqual(expected)
  })
  it('Is a <form>', () => {
    // arrange
    const { container } = signupForm
    signupForm = container.firstChild
    // act
    const tagName = signupForm.tagName.toLowerCase()
    // assert
    expect(tagName).toBe('form')
  })

  describe('Email input', () => {
    it('Has a test id of "email-input"', () => {
      // arrange
      const { queryByTestId } = signupForm
      // act
      const emailInput = queryByTestId('email-input')
      // assert
      expect(emailInput).not.toBeNull()
    })
    it('Is an <input>', () => {
      // arrange
      const { getByTestId } = signupForm
      const emailInput = getByTestId('email-input')
      // act
      const tagName = emailInput.tagName.toLowerCase()
      // assert
      expect(tagName).toBe('input')
    })
    it('Has name "email"', () => {
      // arrange
      const { getByTestId } = signupForm
      const emailInput = getByTestId('email-input')
      // act
      const { name } = emailInput
      // assert
      expect(name).toBe('email')
    })
    it('Is type "email"', () => {
      // arrange
      const { getByTestId } = signupForm
      const emailInput = getByTestId('email-input')
      // act
      const { type } = emailInput
      // assert
      expect(type).toBe('email')
    })
    it('Has a label', () => {
      // arrange
      const { getByLabelText, getByTestId } = signupForm
      const expected = getByTestId('email-input')
      // act
      const actual = getByLabelText(/email/i)
      // assert
      expect(actual).toEqual(expected)
    })
  })

  describe('Password input', () => {
    it('Has a test id of "password-input"', () => {
      // arrange
      const { queryByTestId } = signupForm
      // act
      const passwordInput = queryByTestId('password-input')
      // assert
      expect(passwordInput).not.toBeNull()
    })
    it('Is an <input>', () => {
      // arrange
      const { getByTestId } = signupForm
      const passwordInput = getByTestId('password-input')
      // act
      const tagName = passwordInput.tagName.toLowerCase()
      // assert
      expect(tagName).toBe('input')
    })
    it('Has name "password"', () => {
      // arrange
      const { getByTestId } = signupForm
      const passwordInput = getByTestId('password-input')
      // act
      const { name } = passwordInput
      // assert
      expect(name).toBe('password')
    })
    it('Is type "password"', () => {
      // arrange
      const { getByTestId } = signupForm
      const passwordInput = getByTestId('password-input')
      // act
      const { type } = passwordInput
      // assert
      expect(type).toBe('password')
    })
    it('Has a label', () => {
      // arrange
      const { getByLabelText, getByTestId } = signupForm
      const expected = getByTestId('password-input')
      // act
      const actual = getByLabelText(/password/i)
      // assert
      expect(actual).toEqual(expected)
    })
  })

  describe('Submit button', () => {
    it('Has a test id of "submit-button"', () => {
      // arrange
      const { queryByTestId } = signupForm
      // act
      const submitButton = queryByTestId('submit-button')
      // assert
      expect(submitButton).not.toBeNull()
    })
    it('Is a <button>', () => {
      // arrange
      const { getByTestId } = signupForm
      const submitButton = getByTestId('submit-button')
      // act
      const tagName = submitButton.tagName.toLowerCase()
      // assert
      expect(tagName).toBe('button')
    })
    it('Says "Sign Up"', () => {
      // arrange
      const { getByTestId, getByText } = signupForm
      const expected = getByTestId('submit-button')
      // act
      const actual = getByText(/sign up/i)
      // assert
      expect(actual).toEqual(expected)
    })
  })

  it('Calls signUp() with email and password', () => {
    // arrange
    const { rerender } = signupForm
    const mockSignUpFn = jest.fn()
    rerender(<SignupForm signUp={mockSignUpFn} />)
    const { getByTestId } = signupForm
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'user@example.com' }
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234' }
    })
    // act
    getByTestId('submit-button').click()
    // assert
    expect(mockSignUpFn).toHaveBeenCalledTimes(1)
    expect(mockSignUpFn).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: '1234'
    })
  })
})
