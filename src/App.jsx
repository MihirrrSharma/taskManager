// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase/firebase';
 
const App = () => {
  const [listTask, setListTask] = useState([]);
 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(firestore, 'tasks');
        const querySnapshot = await getDocs(tasksCollection);
        const tasks = [];
        querySnapshot.forEach((oneDoc) => {
          tasks.push({ id: oneDoc.id, ...oneDoc.data() });
        });
        setListTask(tasks);
      } catch (error) {
        console.error('Error fetching tasks from Firestore: ', error);
      }
    };
    fetchTasks();
  }, []);
 
  const addList = async (newTask) => {
    try {
      console.log("New task: ", newTask);
      const tasksCollection = collection(firestore, 'tasks');
      const docRef = await addDoc(tasksCollection, newTask);
      setListTask((prevTasks) => [...prevTasks, { id: docRef.id, ...newTask }]);
      console.log("List tasks", listTask);
    } catch (error) {
      console.error('Error adding task to Firestore: ', error);
    }
  };
 
  const deleteListItem = async (taskId) => {
    try {
      console.log("Task id: ", taskId);
      await deleteDoc(doc(firestore, 'tasks', taskId));
      const updatedTasks = listTask.filter((task) => task.id !== taskId);
      setListTask(updatedTasks);
    } catch (error) {
      console.error('Error deleting task from Firestore: ', error);
    }
  };
 
  return (
<div className="main-container">
<div className="center-container">
<TaskInput addList={addList} />
<h1 className="app-heading">Active Tasks</h1>
<hr />
        {listTask.map((task, index) => (
<TaskList
            key={task.id}
            index={index}
            item={task}
            taskId={task.id}
            deleteItem={deleteListItem}
          />
        ))}
</div>
</div>
  );
};
 
export default App;