import React from 'react';
import './TodoListItem.css'

const TodoListItem = ({
    title,
    completed,
    onTodoClick,
    id,
    onTodoRemove
}) => {
    return (
        <div className='todo-list-item'>
            <div
                className={`todo-list-item__title ${completed ? 'completed' : ''}`}
                onClick={() => onTodoClick(id)}
            >
                {title}
            </div>
            <div
                className='todo-list-item__remove-btn'
                onClick={() => onTodoRemove(id)}
            >
                удалить
            </div>
        </div>
    )
}

export default TodoListItem