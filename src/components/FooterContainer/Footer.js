import React, { Component } from 'react';
import { TasksFilter } from './TasksFilter';

class Footer extends Component {
  render() {
    const { todoCount, filter, onSelectedFilter, clearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <TasksFilter filter={filter} onSelectedFilter={onSelectedFilter} />
        <button onClick={clearCompleted} className="clear-completed">
          Clear completed
        </button>
      </footer>
    );
  }
}

export { Footer };
