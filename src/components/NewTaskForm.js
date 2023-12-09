import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTaskForm extends Component {
  state = {
    taskValue: '',
  };

  onTaskChange = (event) => {
    this.setState({
      taskValue: event.target.value.trimLeft(),
    });
  };

  onSubmitTask = (event) => {
    event.preventDefault();
    const { createNewTask } = this.props;
    const { taskValue } = this.state;
    if (taskValue) {
      createNewTask(taskValue);
      this.setState({
        taskValue: '',
      });
    } else {
      alert('The task cannot be empty');
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmitTask}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onTaskChange}
          value={this.state.taskValue}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  createNewTask: PropTypes.func,
};

export { NewTaskForm };
