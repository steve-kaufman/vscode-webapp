import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

describe("App", () => {
    const app = render(<App />).container.firstChild
    
    it("Has <header>", () => {
        const headerChild = app.querySelector('header')
        expect(headerChild).toBeTruthy()
    })
})