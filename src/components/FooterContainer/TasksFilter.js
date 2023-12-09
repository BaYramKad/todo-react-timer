import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TasksFilter extends Component {
  static propTypes = {
    filter: PropTypes.array,
    onSelectedFilter: PropTypes.func,
  };
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
