import React, { Component } from 'react';

class NewTaskForm extends Component {
  state = {
    taskValue: '',
  };

  onTaskChange = (event) => {
    this.setState({
      taskValue: event.target.value,
    });
  };

  onSubmitTask = (event) => {
    event.preventDefault();
    const { createNewTask } = this.props;
    const { taskValue } = this.state;
    createNewTask(taskValue);
    this.setState({
      taskValue: '',
    });
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

export { NewTaskForm };
