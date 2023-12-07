import React, { Component } from 'react';

class TasksFilter extends Component {
  render() {
    const { filter, onSelectedFilter } = this.props;

    const filterItems = filter.map((item) => {
      const { status, completed, id } = item;
      return (
        <li key={id}>
          <button
            disabled={completed && 'disabled'}
            onClick={() => onSelectedFilter(id)}
            className={completed ? 'selected' : ''}>
            {status}
          </button>
        </li>
      );
    });
    return <ul className="filters">{filterItems}</ul>;
  }
}

export { TasksFilter };
