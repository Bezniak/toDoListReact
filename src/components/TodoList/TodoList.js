import React from "react";
import Spinner from "../Spinner/Spinner";
import TodoListItem from "../TodoListItem/TodoListItem";

const TodoList = ({
  loading,
  todos,
  todoClickHandler,
  removeTodo,
  filterText
}) => {
  if (loading) {
    return <Spinner />
  }

  if (!todos.length) {
    return <div>нет тудус!</div>
  }

  return (
      <div className="todo-list-wrapper">
        {todos.filter(todo => todo.title.includes(filterText)).map((todo) => (
          <TodoListItem
            onTodoClick={todoClickHandler}
            onTodoRemove={removeTodo}
            key={todo.id}
            {...todo}
          />
        ))}
      </div>
  )
}

export default TodoList;
