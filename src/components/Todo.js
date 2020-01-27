import React, { Component } from 'react'

export default class Todo extends Component {
    onDelete() {
        this.props.deleteTodo(this.props.data.id)
    }
    onChecked(){
        const { id, completed } = this.props.data
        this.props.setCompleted(id, !completed)
    }
    render() {
        const { title, description } = this.props.data
        return (
            <div data-testid='todo'>
                <h3 data-testid='title'>{ title }</h3>
                <p data-testid='description'>{ description }</p>
                <input 
                    data-testid='checkbox' 
                    type='checkbox' 
                    defaultChecked={this.props.data.completed}
                    onClick={this.onChecked.bind(this)} 
                />
                <button 
                    data-testid='delete-button' 
                    onClick={this.onDelete.bind(this)}
                />
            </div>
        )
    }
}