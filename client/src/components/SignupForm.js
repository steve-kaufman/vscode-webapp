import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function SignupForm ({ signUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    signUp({ email, password })
  }

  return (
    <form data-testid='signup-form' onSubmit={onSubmit}>
      <label htmlFor='email'>Email:</label>
      <input
        data-testid='email-input'
        id='email'
        name='email'
        type="email"
        onChange={e => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password:</label>
      <input
        data-testid='password-input'
        id='password'
        name='password'
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button data-testid='submit-button'>Sign Up</button>
    </form>
  )
}

SignupForm.propTypes = {
  signUp: PropTypes.func
}
