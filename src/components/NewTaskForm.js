import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const NewTaskForm = ({ createNewTask }) => {
  const [value, setValue] = useState('');

  const onTaskChange = (event) => {
    const targetValue = event.target.value.trimLeft();
    setValue(targetValue);
  };

  const onSubmitTask = (event) => {
    event.preventDefault();
    if (!value) {
      alert('The task cannot be empty');
    } else {
      createNewTask(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmitTask}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onTaskChange}
        value={value}
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  createNewTask: PropTypes.func,
};
