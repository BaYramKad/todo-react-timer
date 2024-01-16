import React from 'react';

import { NewTaskForm } from './NewTaskForm';
import { TaskList } from './TodoContainer/TaskList';
import { Footer } from './FooterContainer/Footer';
import { useState } from 'react';
import { useRef } from 'react';
import { getCurrentTimer } from '../access/getCurrentTimer';

export const TodoApp = () => {
  const initialFilterData = [
    { status: 'All', completed: true, id: 1 },
    { status: 'Completed', completed: false, id: 2 },
    { status: 'Active', completed: false, id: 3 },
  ];

  const [unicId, setUnicId] = useState(10);
  const [todoData, setTodoData] = useState([]);
  const [filterData, setFilterData] = useState(initialFilterData);
  const [todoIdTimer, setTodoIdTimer] = useState({});
  const timerIdRef = useRef();

  const createNewTask = (text) => {
    setUnicId((prevUnicId) => prevUnicId + 1);
    const newTask = {
      title: text,
      completed: false,
      id: unicId,
      created: Date.now(),
      timer: 0,
      currentTime: '00:00:00',
      isStart: true,
    };
    setTodoData((prevTodoTask) => [newTask, ...prevTodoTask]);
  };

  const claearTimer = (id) => {
    const obj = todoData.find((item) => item.id === id);
    clearTimeout(obj.refId);
  };

  const deleteTask = (id) => {
    setTodoData((prevTodoData) => {
      claearTimer(id);
      return prevTodoData.filter((item) => item.id !== id);
    });
  };
  const onClickDone = (event, id) => {
    console.log('done');
    const t = event.target;
    const match = t.matches('label') || t.matches('span.title') || t.matches('.toggle');
    if (match) {
      setTodoData((prevTodoData) => {
        return prevTodoData.map((item) => {
          return item.id === id ? { ...item, completed: !item.completed } : item;
        });
      });
    }
  };

  const changeImagePlay = (id) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((item) =>
        item.id === id ? { ...item, isStart: !item.isStart } : item,
      );
    });
  };
  const onAddRefId = (id) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((item) =>
        item.id === id ? { ...item, refId: timerIdRef.current } : item,
      );
    });
    setTodoIdTimer((prevIdTimer) => {
      return {
        ...prevIdTimer,
        [timerIdRef.current]: timerIdRef.current,
      };
    });
  };
  const onUpdateTimer = (id) => {
    timerIdRef.current = setInterval(() => {
      setTodoData((prevTodoData) => {
        return prevTodoData.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              timer: item.timer + 1,
              currentTime: getCurrentTimer(item.timer + 1),
            };
          }
          return item;
        });
      });
    }, 1000);
    changeImagePlay(id);
    onAddRefId(id);
  };

  const changeTheValue = (title, id) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((item) => (item.id === id ? { ...item, title } : item));
    });
  };
  const offUpdateTimer = (id, refId) => {
    clearInterval(todoIdTimer[refId]);
    changeImagePlay(id);
  };

  const clearCompleted = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((item) => !item.completed));
    todoData.forEach((item) => {
      if ('refId' in item) {
        clearTimeout(item.refId);
      }
    });
  };
  const onSelectedFilter = (id) => {
    setFilterData((prevFilterData) => {
      return prevFilterData.map((item) => {
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
    });
  };
  const todoCount = todoData.filter((item) => !item.completed).length;
  return (
    <section className="todoapp">
      <header className="header">
        <h1 className="todo-title">Todos</h1>
        <NewTaskForm createNewTask={createNewTask} />
      </header>
      <section className="main">
        <TaskList
          filter={filterData}
          todos={todoData}
          onDeleteTask={deleteTask}
          onClickDone={onClickDone}
          changeTheValue={changeTheValue}
          onUpdateTimer={onUpdateTimer}
          offUpdateTimer={offUpdateTimer}
        />
        <Footer
          clearCompleted={clearCompleted}
          todoCount={todoCount}
          filter={filterData}
          onSelectedFilter={onSelectedFilter}
        ></Footer>
      </section>
    </section>
  );
};
