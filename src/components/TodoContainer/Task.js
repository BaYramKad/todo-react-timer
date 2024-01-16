import React, { useState } from 'react';
import PropTypes from 'prop-types';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const Task = (props) => {
  const {
    title,
    completed,
    id,
    created,
    onDeleteTask,
    onClickDone,
    currentTime,
    isStart,
    changeTheValue,
    onUpdateTimer,
    offUpdateTimer,
    refId,
  } = props;
  const [visibleInput, setVisibleInput] = useState(false);
  const [changedValue, setChangedValue] = useState('');
  const onChangeValue = (event) => {
    const value = event.target.value.trimLeft();
    setChangedValue(value);
  };
  const setNewValue = (event) => {
    event.preventDefault();
    if (changedValue) {
      changeTheValue(changedValue, id);
      event.target.nextElementSibling.classList.toggle('editing');
      setVisibleInput(false);
    } else {
      alert('The task cannot be empty');
    }
  };

  const onEditValue = (event) => {
    event.target.closest('li').classList.toggle('editing');
    setVisibleInput(true);
    setChangedValue(title);
  };

  const distance = formatDistanceToNow(created, { addSuffix: true });
  return (
    <>
      {visibleInput && (
        <form onSubmit={setNewValue}>
          <input className="edit" onChange={onChangeValue} type="text" value={changedValue} />
        </form>
      )}
      <li
        key={id}
        className={`${completed ? 'completed' : 'not-completed'}`}
        onClick={(event) => onClickDone(event, id)}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed && true}
            onChange={() => {}}
          />
          <label htmlFor="title">
            <span className="title" id="title">
              {title}
            </span>
            <span className="description">
              {isStart ? (
                <button className="icon icon-play" onClick={() => onUpdateTimer(id)}></button>
              ) : (
                <button
                  className="icon icon-pause"
                  onClick={() => offUpdateTimer(id, refId)}
                ></button>
              )}
              {currentTime}
            </span>
            <span className="created">{distance}</span>
          </label>
          <button className="icon icon-edit" onClick={onEditValue}></button>
          <button className="icon icon-destroy" onClick={() => onDeleteTask(id)}></button>
        </div>
      </li>
    </>
  );
};

// class Task extends Component {
//   static defaultProps = {
//     title: 'New Task',
//     completed: false,
//   };

//   // static propTypes = {
//   //   title: PropTypes.string,
//   //   completed: PropTypes.bool,
//   //   id: PropTypes.number,
//   //   created: PropTypes.number,
//   //   onDeleteTask: PropTypes.func,
//   //   onClickDone: PropTypes.func,
//   //   changeTheValue: PropTypes.func,
//   // };

//   // state = {
//   //   changedValue: '',
//   //   viewInput: false,
//   // };

//   // onChangeValue = (event) => {
//   //   const value = event.target.value.trimLeft();
//   //   this.setState({
//   //     changedValue: value,
//   //   });
//   // };

//   setNewValue = (event) => {
//     event.preventDefault();
//     const { changedValue } = this.state;
//     const { changeTheValue, id } = this.props;
//     if (changedValue) {
//       changeTheValue(changedValue, id);
//       event.target.nextElementSibling.classList.toggle('editing');
//       this.setState({
//         viewInput: false,
//       });
//     } else {
//       alert('The task cannot be empty');
//     }
//   };

//   onEditValue = (event) => {
//     event.target.closest('li').classList.toggle('editing');

//     this.setState({
//       viewInput: true,
//       changedValue: this.props.title,
//     });
//   };

//   render() {
//     const {
//       title,
//       completed,
//       id,
//       created,
//       onDeleteTask,
//       onClickDone,
//       currentTime,
//       isStart,
//       onUpdateTimer,
//       offUpdateTimer,
//       refId,
//     } = this.props;
//     const { changedValue, viewInput } = this.state;

//     return (
//       <>
//         {viewInput && (
//           <form onSubmit={this.setNewValue}>
//             <input
//               className="edit"
//               onChange={this.onChangeValue}
//               type="text"
//               value={changedValue}
//             />
//           </form>
//         )}
//         <li
//           key={id}
//           className={`${completed ? 'completed' : 'not-completed'}`}
//           onClick={(event) => onClickDone(event, id)}
//         >
//           <div className="view">
//             <input
//               className="toggle"
//               type="checkbox"
//               checked={completed && true}
//               onChange={() => {}}
//             />
//             <label htmlFor="title">
//               <span className="title" id="title">
//                 {title}
//               </span>
//               <span className="description">
//                 {isStart ? (
//                   <button className="icon icon-play" onClick={() => onUpdateTimer(id)}></button>
//                 ) : (
//                   <button
//                     className="icon icon-pause"
//                     onClick={() => offUpdateTimer(id, refId)}
//                   ></button>
//                 )}
//                 {currentTime}
//               </span>
//               <span className="created">{distance}</span>
//             </label>
//             <button className="icon icon-edit" onClick={this.onEditValue}></button>
//             <button className="icon icon-destroy" onClick={() => onDeleteTask(id)}></button>
//           </div>
//         </li>
//       </>
//     );
//   }
// }

Task.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool,
  id: PropTypes.number,
  created: PropTypes.number,
  onDeleteTask: PropTypes.func,
  onClickDone: PropTypes.func,
  changeTheValue: PropTypes.func,
};
