import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from '../App'

describe("App", () => {
    const app = render(<App />).container.firstChild
    
    it("Has <header>", () => {
        const header = app.querySelector('header')
        expect(header).not.toBeNull()
    })
    it("Has <main>", () => {
        const main = app.querySelector('main')
        expect(main).not.toBeNull()
    })
    it("Has <footer>", () => {
        const footer = app.querySelector('footer')
        expect(footer).not.toBeNull()
    })
})