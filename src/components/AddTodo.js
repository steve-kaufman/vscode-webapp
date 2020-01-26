import React, { Component } from 'react'
import '../styles/AddTodo.css'

export default class AddTodo extends Component {
    onSubmit(e){
        e.preventDefault()
        const { title, description } = e.target.elements
        this.props.onSubmit({
            title: title.value,
            description: description.value
        })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label htmlFor="title">Title:</label>
                    <input id="title" />
                    <label htmlFor="description">Description:</label>
                    <input id="description" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}