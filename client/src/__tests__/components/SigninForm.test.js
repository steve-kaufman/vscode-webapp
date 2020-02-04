import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SigninForm from '../../components/SigninForm'

describe('SigninForm', () => {
  let signinForm = null

  afterEach(cleanup)

  beforeEach(() => {
    signinForm = render(<SigninForm />)
  })

  it('Renders', () => {
    expect(signinForm).toBeTruthy()
  })
  it('Has a test id of "signin-form"', () => {
    // arrange
    const { queryByTestId, container } = signinForm
    const expected = container.firstChild
    // act
    const actual = queryByTestId('signin-form')
    // assert
    expect(actual).not.toBeNull()
    expect(actual).toEqual(expected)
  })
  it('Is a <form>', () => {
    // arrange
    const { container } = signinForm
    signinForm = container.firstChild
    // act
    const tagName = signinForm.tagName.toLowerCase()
    // assert
    expect(tagName).toBe('form')
  })

  describe('Email input', () => {
    it('Has a test id of "email-input"', () => {
      // arrange
      const { queryByTestId } = signinForm
      // act
      const emailInput = queryByTestId('email-input')
      // assert
      expect(emailInput).not.toBeNull()
    })
    it('Is an <input>', () => {
      // arrange
      const { getByTestId } = signinForm
      const emailInput = getByTestId('email-input')
      // act
      const tagName = emailInput.tagName.toLowerCase()
      // assert
      expect(tagName).toBe('input')
    })
    it('Has name "email"', () => {
      // arrange
      const { getByTestId } = signinForm
      const emailInput = getByTestId('email-input')
      // act
      const { name } = emailInput
      // assert
      expect(name).toBe('email')
    })
    it('Is type "email"', () => {
      // arrange
      const { getByTestId } = signinForm
      const emailInput = getByTestId('email-input')
      // act
      const { type } = emailInput
      // assert
      expect(type).toBe('email')
    })
    it('Has a label', () => {
      // arrange
      const { getByLabelText, getByTestId } = signinForm
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
      const { queryByTestId } = signinForm
      // act
      const passwordInput = queryByTestId('password-input')
      // assert
      expect(passwordInput).not.toBeNull()
    })
    it('Is an <input>', () => {
      // arrange
      const { getByTestId } = signinForm
      const passwordInput = getByTestId('password-input')
      // act
      const tagName = passwordInput.tagName.toLowerCase()
      // assert
      expect(tagName).toBe('input')
    })
    it('Has name "password"', () => {
      // arrange
      const { getByTestId } = signinForm
      const passwordInput = getByTestId('password-input')
      // act
      const { name } = passwordInput
      // assert
      expect(name).toBe('password')
    })
    it('Is type "password"', () => {
      // arrange
      const { getByTestId } = signinForm
      const passwordInput = getByTestId('password-input')
      // act
      const { type } = passwordInput
      // assert
      expect(type).toBe('password')
    })
    it('Has a label', () => {
      // arrange
      const { getByLabelText, getByTestId } = signinForm
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
      const { queryByTestId } = signinForm
      // act
      const submitButton = queryByTestId('submit-button')
      // assert
      expect(submitButton).not.toBeNull()
    })
    it('Is a <button>', () => {
      // arrange
      const { getByTestId } = signinForm
      const submitButton = getByTestId('submit-button')
      // act
      const tagName = submitButton.tagName.toLowerCase()
      // assert
      expect(tagName).toBe('button')
    })
    it('Says "Sign Up"', () => {
      // arrange
      const { getByTestId, getByText } = signinForm
      const expected = getByTestId('submit-button')
      // act
      const actual = getByText(/sign up/i)
      // assert
      expect(actual).toEqual(expected)
    })
  })

  it('Calls signUp() with email and password', () => {
    // arrange
    const { rerender } = signinForm
    const mockSignInFn = jest.fn()
    rerender(<SigninForm signIn={mockSignInFn} />)
    const { getByTestId } = signinForm
    fireEvent.change(getByTestId('email-input'), {
      target: { value: 'user@example.com' }
    })
    fireEvent.change(getByTestId('password-input'), {
      target: { value: '1234' }
    })
    // act
    getByTestId('submit-button').click()
    // assert
    expect(mockSignInFn).toHaveBeenCalledTimes(1)
    expect(mockSignInFn).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: '1234'
    })
  })
})
