import React from 'react';
import { TasksFilter } from './TasksFilter';
import PropTypes from 'prop-types';

export const Footer = (props) => {
  const { todoCount, filter, onSelectedFilter, clearCompleted } = props;
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TasksFilter filter={filter} onSelectedFilter={onSelectedFilter} />
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  filter: PropTypes.array,
  onSelectedFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
};
