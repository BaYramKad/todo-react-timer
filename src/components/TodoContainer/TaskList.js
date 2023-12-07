import React, { Component } from 'react';
import { Task } from './Task';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
class TaskList extends Component {
  render() {
    const date = formatDistanceToNow(new Date(), new Date());
    const { filter, todos, onDeleteTask, onClickDone } = this.props;
    const { status } = filter.find((item) => item.completed === true);

    const tasks = todos
      .filter((item) => {
        if (status === 'Active') return !item.completed;
        if (status === 'Completed') return item.completed;
        return item;
      })
      .map((item) => {
        return (
          <Task key={item.id} {...item} onDeleteTask={onDeleteTask} onClickDone={onClickDone} />
        );
      });

    return <ul className="todo-list">{tasks}</ul>;
  }
}

export { TaskList };
