import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

export default class TodoList extends Component {
  render () {
    const { deleteTodo, setCompleted } = this.props
    return (
      <div data-testid="todoList">
        {this.props.todos.map((todo, index) => (
          <Todo
            key={index}
            deleteTodo={deleteTodo}
            setCompleted={setCompleted}
            data={todo}
          />
        ))}
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array,
  deleteTodo: PropTypes.func,
  setCompleted: PropTypes.func
}