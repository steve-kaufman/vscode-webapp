import React, { Component } from 'react'
import './styles/App.css'
import Header from './components/Header.jsx'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import API from './api'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      todos: []
    }
    fetch('/todo')
  }

  addTodo (todo) {
    API.service('todos').create(todo)
  }

  render () {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <TodoForm onSubmit={this.addTodo.bind(this)} />
          <TodoList
            deleteTodo={() => null}
            setComplete={() => null}
            todos={this.state.todos}
          />
        </main>
        <footer></footer>
      </div>
    )
  }
}
