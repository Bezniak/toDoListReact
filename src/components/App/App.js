import React from "react";
import TodoList from "../TodoList/TodoList";
import Header from "../Header/Header";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      loading: true,
      newTodoText: '',
      filterText: ''
    };

    this.todoClickHandler = this.todoClickHandler.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.getTodoText = this.getTodoText.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getFilterText = this.getFilterText.bind(this);
  }

  componentDidMount() {
    if (!this.state.todos.length) {
      this.timeoutId = setTimeout(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => response.json())
          .then((todos) =>
            this.setState({
              todos,
              loading: false,
            })
          );
      }, 2000);
    } else {
      this.setState({
        loading: false
      })
    }
  }

  componentDidUpdate() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos))
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  getTodoText(text){
    this.setState({
      todoText: text
    })
  }

  handleKeyPress(e){
    e.preventDefault()

    const newTodo = {
      completed: false,
      id: Date.now(),
      title: this.state.todoText,
      userId: 1
    }

    const newTodos = [newTodo, ...this.state.todos];

    this.setState({
      todos: newTodos,
      todoText: ''
    })
  }

  getFilterText(text){
    this.setState({
      filterText: text
    })
  }


  todoClickHandler(id) {
    const targetTodoIndex = this.state.todos.findIndex(
      (todo) => todo.id === id
    );

    const newTodo = { ...this.state.todos[targetTodoIndex] };
    const newTodos = [...this.state.todos];

    newTodo.completed = !newTodo.completed;

    newTodos[targetTodoIndex] = newTodo;

    this.setState({
      todos: newTodos,
    });
  }

  removeTodo(id) {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: newTodos,
    });
  }

  render() {
    const todosLength = this.state.todos.length;
    const todosDone = this.state.todos.filter(todo => todo.completed).length;
    const todosNotDone = todosLength - todosDone;

    return (
      <ErrorBoundary>
        <div className="app">
            <Header 
              todosDone={todosDone} 
              todosNotDone={todosNotDone}
              getTodoText={this.getTodoText}
              keyPress={this.handleKeyPress}
              todoText={this.state.todoText}
              getFilterText={this.getFilterText}
            />
            <TodoList
              loading={this.state.loading}
              todos={this.state.todos}
              todoClickHandler={this.todoClickHandler}
              removeTodo={this.removeTodo}
              filterText={this.state.filterText}
            />
        </div>
      </ErrorBoundary>  
    );
  }
}

export default App;
