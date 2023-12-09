import React, { Component } from 'react';
import { TasksFilter } from './TasksFilter';
import PropTypes from 'prop-types';

class Footer extends Component {
  static defaultProps = {
    todoCount: 0,
  };

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

Footer.propTypes = {
  todoCount: PropTypes.number,
  filter: PropTypes.array,
  onSelectedFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};

export { Footer };
