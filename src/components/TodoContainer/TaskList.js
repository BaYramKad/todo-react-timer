import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Task } from './Task';
// filter, todos, onDeleteTask, onClickDone
class TaskList extends Component {
  static propTypes = {
    filter: PropTypes.arrayOf(PropTypes.object),
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleteTask: PropTypes.func,
    onClickDone: PropTypes.func,
  };

  render() {
    const { filter, todos, onDeleteTask, onClickDone, changeTheValue } = this.props;
    const { status } = filter.find((item) => item.completed === true);

    const tasks = todos
      .filter((item) => {
        if (status === 'Active') return !item.completed;
        if (status === 'Completed') return item.completed;
        return item;
      })
      .map((item) => {
        return (
          <Task
            key={item.id}
            {...item}
            onDeleteTask={onDeleteTask}
            onClickDone={onClickDone}
            changeTheValue={changeTheValue}
          />
        );
      });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

export { TaskList };
