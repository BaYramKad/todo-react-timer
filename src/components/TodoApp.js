import React, { Component, createRef } from 'react';

import { NewTaskForm } from './NewTaskForm';
import { TaskList } from './TodoContainer/TaskList';
import { Footer } from './FooterContainer/Footer';
import { getCurrentTimer } from '../access/getCurrentTimer';

class TodoApp extends Component {
  unicId = 50;
  intervalTimer = null;
  state = {
    todoData: [],
    filter: [
      { status: 'All', completed: true, id: 1 },
      { status: 'Completed', completed: false, id: 2 },
      { status: 'Active', completed: false, id: 3 },
    ],
    refsIds: {},
  };
  componentDidMount() {
    const localItem = JSON.parse(localStorage.getItem(`timer`)) || [];
    this.setState((prevData) => {
      return {
        ...prevData,
        todoData: localItem,
      };
    });
  }
  onAddRefId(id) {
    this.setState(({ refsIds, todoData }) => {
      const newData = todoData.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            refId: this.ref.current,
          };
        }
        return todo;
      });
      return {
        refsIds: {
          ...refsIds,
          [this.ref.current]: this.ref.current,
        },
        todoData: [...newData],
      };
    });
  }

  onUpdateTimer = (id) => {
    this.ref = createRef();
    this.ref.current = setInterval(() => {
      this.setState((prevState) => {
        const newArr = prevState.todoData.map((item) => {
          const resObj = {
            ...item,
            timer: item.timer + 1,
            currentTime: getCurrentTimer(item.timer + 1),
          };
          const changed = item.id === id ? resObj : item;
          return changed;
        });
        return {
          ...prevState,
          todoData: [...newArr],
        };
      });
    }, 1000);
    this.changeImagePlay(id);
    this.onAddRefId(id);
  };

  offUpdateTimer = (id, refId) => {
    clearInterval(this.state.refsIds[refId]);
    this.changeImagePlay(id);
  };
  changeImagePlay = (id) => {
    this.setState((prevState) => {
      const newArr = prevState.todoData.map((item) => {
        const resObj = {
          ...item,
          isStart: !item.isStart,
        };
        const changed = item.id === id ? resObj : item;
        return changed;
      });
      return {
        ...prevState,
        todoData: [...newArr],
      };
    });
  };

  onClickDone = (event, id) => {
    const t = event.target;
    const match = t.matches('label') || t.matches('span.title') || t.matches('.toggle');
    if (match) {
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

  claearTimer = (id) => {
    const obj = this.state.todoData.find((item) => item.id === id);
    clearTimeout(obj.refId);
  };

  deleteTask = (id) => {
    const localItem = JSON.parse(localStorage.getItem(`timer`));
    const filrerStorage = localItem.filter((item) => item.id !== id);
    localStorage.setItem(`timer`, JSON.stringify(filrerStorage));

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      this.claearTimer(id);
      return {
        todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)],
      };
    });
  };

  createNewTask = (text) => {
    const unicId = this.unicId++;
    const newTask = {
      title: text,
      completed: false,
      id: unicId,
      created: Date.now(),
      timer: 0,
      currentTime: '00:00:00',
      isStart: true,
    };

    const taskStorage = JSON.parse(localStorage.getItem(`timer`)) || [];
    localStorage.setItem(`timer`, JSON.stringify([...taskStorage, newTask]));
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
      todoData.forEach((item) => {
        if ('refId' in item) {
          clearTimeout(item.refId);
        }
      });
      return {
        todoData: [...clearningData],
      };
    });
  };

  changeTheValue = (newValue, id) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: newValue,
          };
        }
        return item;
      });

      return {
        todoData: [...newArray],
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
            changeTheValue={this.changeTheValue}
            onUpdateTimer={this.onUpdateTimer}
            offUpdateTimer={this.offUpdateTimer}
          />
          <Footer
            clearCompleted={this.clearCompleted}
            todoCount={todoCount}
            filter={filter}
            onSelectedFilter={this.onSelectedFilter}
          >
            <span>click</span>
          </Footer>
        </section>
      </section>
    );
  }
}

export { TodoApp };
