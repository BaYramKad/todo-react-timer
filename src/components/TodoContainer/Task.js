import React, { Component } from 'react';
class Task extends Component {
  render() {
    const { title, completed, id, onDeleteTask, onClickDone } = this.props;
    return (
      <li
        key={id}
        className={`${completed && 'completed'}`}
        onClick={(event) => onClickDone(event, id)}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed && true}
            onChange={() => {}}
          />
          <label>
            <span className="description">{title}</span>
            <span className="created">created 5 minutes ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={() => onDeleteTask(id)}></button>
        </div>
      </li>
    );
  }
}

export { Task };
