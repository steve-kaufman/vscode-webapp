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
    this.loadTodos()
  }

  async loadTodos () {
    const { data } = await API.service('todos').find()
    this.setState({ ...this.state, todos: data })
  }

  async addTodo (todoData) {
    // return value of API create will be same as todoData but with id property
    const todo = await API.service('todos').create(todoData)
    // make a copy of this.state.todos (can't directly modify state)
    const todos = this.state.todos.slice()
    // add todo to copy of todos array
    todos.push(todo)
    // set state with new copy of todos array
    this.setState({ ...this.state, todos })
  }

  deleteTodo (id) {
    // delete todo in database
    API.service('todos').remove(id)
    // make a copy of this.state.todos (can't directly modify state)
    const todos = this.state.todos.slice()
    // find index of todo to be deleted
    const todoIndex = todos.findIndex(todo => todo.id === id)
    // remove todo from this.state.todos
    todos.splice(todoIndex)
    // set state with new copy of todos array
    this.setState({ ...this.state, todos })
  }

  setCompleted (id, completed) {
    // patch todo in database
    API.service('todos').patch(id, { completed })
    // make a copy of this.state.todos (can't directly modify state)
    const todos = this.state.todos.slice()
    // find index of todo to be updated
    const todoIndex = todos.findIndex(todo => todo.id === id)
    // update todo.completed
    todos[todoIndex].completed = completed
    // set state with new copy of todos array
    this.setState({ ...this.state, todos })
  }

  render () {
    return (
      <div className="App">
        <header>
          <Header />
        </header>
        <main>
          <TodoForm addTodo={this.addTodo.bind(this)} />
          <TodoList
            deleteTodo={this.deleteTodo.bind(this)}
            setCompleted={this.setCompleted.bind(this)}
            todos={this.state.todos}
          />
        </main>
        <footer></footer>
      </div>
    )
  }
}
