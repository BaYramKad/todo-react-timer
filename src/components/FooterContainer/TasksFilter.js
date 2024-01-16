import React from 'react';
import PropTypes from 'prop-types';

export const TasksFilter = (props) => {
  const { filter, onSelectedFilter } = props;
  return (
    <ul className="filters">
      {filter.map(({ status, completed, id }) => {
        return (
          <li key={id}>
            <button
              disabled={completed && 'disabled'}
              onClick={() => onSelectedFilter(id)}
              className={completed ? 'selected' : ''}
            >
              {status}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

TasksFilter.propTypes = {
  filter: PropTypes.array,
  onSelectedFilter: PropTypes.func,
};
