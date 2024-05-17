// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskInput = ({ addList }) => {
  const [inputText, setInputText] = useState('');

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputText.trim() !== '') {
        try {
          const taskData = { content: inputText }; 
          addList(taskData); 
          setInputText(''); 
        } catch (error) {
          console.error('Error adding task to Firestore: ', error);
        }
      }
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        className="input-box-todo"
        placeholder="Enter your task"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

TaskInput.propTypes = {
  addList: PropTypes.func.isRequired,
};

export default TaskInput;
