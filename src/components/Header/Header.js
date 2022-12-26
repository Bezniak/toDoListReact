import React from "react";
import "./Header.scss";

class Header extends React.Component {
  render() {
    const {
      todosDone = 0, 
      todosNotDone = 0, 
      getTodoText, 
      keyPress,
      todoText,
      getFilterText
    } = this.props;

    return (
      <div className="header-wrapper">
        <div className="green">Сделано {todosDone}</div>
        <div className="tomato">Не сделано {todosNotDone}</div>
        <div className="purple">Всего {todosDone + todosNotDone}</div>
        <div className="header-wrapper__inputs">
          <form onSubmit={keyPress}>
            <input 
              className="add-todo" 
              type="text" 
              placeholder="Add Todo"
              value={todoText}
              onChange={(e) => getTodoText(e.target.value)}
            />
          </form>
        
          <div>
            <input
                className="find-todos" 
                type="text" 
                placeholder="Find Todos"
                onChange={(e)=> getFilterText(e.target.value)}
              />
          </div>
        </div> 
      </div>
    );
  }
}

export default Header;
