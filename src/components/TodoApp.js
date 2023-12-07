import React, { Component } from 'react';
import { NewTaskForm } from './NewTaskForm';
import { TaskList } from './TodoContainer/TaskList';
import { Footer } from './FooterContainer/Footer';

class TodoApp extends Component {
  unicId = 50;
  state = {
    todoData: [
      { title: 'learn react', completed: false, id: 1 },
      { title: 'drink cofee', completed: false, id: 2 },
      { title: 'read book', completed: false, id: 3 },
      { title: 'drink juce', completed: false, id: 4 },
    ],
    filter: [
      { status: 'All', completed: true, id: 1 },
      { status: 'Completed', completed: false, id: 2 },
      { status: 'Active', completed: false, id: 3 },
    ],
  };

  onClickDone = (event, id) => {
    const t = event.target;
    if (t.matches('label') || t.matches('span.description')) {
      this.setState((prevState) => {
        const newArr = prevState.todoData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              completed: !item.completed,
            };
          }
          return item;
        });

        return {
          ...prevState,
          todoData: [...newArr],
        };
      });
    }
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      };
    });
  };

  createNewTask = (text) => {
    const newTask = { title: text, completed: false, id: this.unicId };
    this.unicId++;
    this.setState(({ todoData }) => {
      return {
        todoData: [newTask, ...todoData],
      };
    });
  };

  onSelectedFilter = (id) => {
    this.setState(({ filter }) => {
      const newFilter = filter.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return {
          ...item,
          completed: false,
        };
      });
      return {
        filter: [...newFilter],
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const clearningData = todoData.filter((item) => !item.completed);
      return {
        todoData: [...clearningData],
      };
    });
  };

  render() {
    const { todoData, filter } = this.state;
    const todoCount = todoData.filter((item) => !item.completed).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm createNewTask={this.createNewTask} />
        </header>
        <section className="main">
          <TaskList
            filter={filter}
            todos={todoData}
            onDeleteTask={this.deleteTask}
            onClickDone={this.onClickDone}
          />
          <Footer
            clearCompleted={this.clearCompleted}
            todoCount={todoCount}
            filter={filter}
            onSelectedFilter={this.onSelectedFilter}
          />
        </section>
      </section>
    );
  }
}

export { TodoApp };
