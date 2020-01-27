import React, { Component } from 'react'
import './styles/App.css'
import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm'

export default class App extends Component {
  addTodo (todo) {
    fetch('/todo')
  }

  render () {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <TodoForm onSubmit={this.addTodo.bind(this)} />
        </main>
        <footer></footer>
      </div>
    )
  }
}
