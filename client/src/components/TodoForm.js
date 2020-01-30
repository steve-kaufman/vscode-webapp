import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/TodoForm.css'

export default class TodoForm extends Component {
  onSubmit (e) {
    e.preventDefault()
    const { title, description } = e.target.elements
    this.props.addTodo({
      title: title.value,
      description: description.value
    })
  }

  render () {
    return (
      <div data-testid="todoForm">
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="title">Title:</label>
          <input data-testid="title" id="title" />
          <label htmlFor="description">Description:</label>
          <input data-testid="description" id="description" />
          <button
            data-testid="submit-button"
            type="submit"
          >Submit</button>
        </form>
      </div>
    )
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func
}
