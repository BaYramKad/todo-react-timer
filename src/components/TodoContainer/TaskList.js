import React from 'react';
import PropTypes from 'prop-types';

import { Task } from './Task';

export const TaskList = (props) => {
  const {
    filter,
    todos,
    onDeleteTask,
    onClickDone,
    changeTheValue,
    onUpdateTimer,
    offUpdateTimer,
  } = props;
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
          onUpdateTimer={onUpdateTimer}
          offUpdateTimer={offUpdateTimer}
        />
      );
    });
  return (
    <ul className="todo-list">
      {!tasks.length ? <span className="empty-todo">Todo is empty</span> : tasks}
    </ul>
  );
};

TaskList.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.object),
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleteTask: PropTypes.func,
  onClickDone: PropTypes.func,
  changeTheValue: PropTypes.func,
  offUpdateTimer: PropTypes.func,
  onUpdateTimer: PropTypes.func,
};
