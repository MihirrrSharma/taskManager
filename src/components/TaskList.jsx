// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const TaskList = ({ index, taskId, item, deleteItem}) => {
  console.log("index, item, delete", index, item, deleteItem);
  const [timerActive, setTimerActive] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const handleTaskItemClick = () => {
    if (!timerActive) {
      const startTime = Date.now() - (secondsElapsed * 1000);
      const intervalId = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        setSecondsElapsed(elapsedSeconds);
      }, 1000);
      setTimerInterval(intervalId);
      setTimerActive(true);
    } else {
      clearInterval(timerInterval);
      setTimerActive(false);
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  const handleDeleteTask = async () => {
    clearInterval(timerInterval);
    try {
      deleteItem(taskId); 
      console.log("Item deleted");
    } catch (error) {
      console.error('Error deleting task from Firestore: ', error);
    }
  };

  return (
    <div className="parent-container">
     <div className="list-item" onClick={handleTaskItemClick}>
      <span>{item.content}</span>
      <span className="icons">
        <i
          className="fa-solid fa-trash-can icon-delete"
          onClick={(e) => {
            e.stopPropagation(); 
            handleDeleteTask();
          }}
        ></i>
      </span>
     </div>
     <div className="timer-container">
      <span className="timer">{timerActive? formatTime(secondsElapsed): null}</span>
     </div>
    </div>
  );
};

TaskList.propTypes = {
  index: PropTypes.number.isRequired,
  taskId: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TaskList;
