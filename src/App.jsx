import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

function App() {
  const [tasks, setTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditingDoneTask, setIsEditingDoneTask] = useState(false);

  const handleTaskChange = (event) => {
    setTaskText(event.target.value);
  };

  const addTask = () => {
    if (taskText.trim() !== '') {
      if (editMode) {
        if (isEditingDoneTask) {
          const updatedDoneTasks = [...doneTasks];
          updatedDoneTasks[editIndex] = taskText;
          setDoneTasks(updatedDoneTasks);
        } else {
          const updatedTasks = [...tasks];
          updatedTasks[editIndex] = taskText;
          setTasks(updatedTasks);
        }
        setEditMode(false);
        setEditIndex(null);
        setTaskText('');
        setIsEditingDoneTask(false);
      } else {
        setTasks([...tasks, taskText]);
        setTaskText('');
      }
    }
  };

  const editTask = (index, isDoneTask) => {
    if (isDoneTask) {
      const taskToEdit = doneTasks[index];
      setTaskText(taskToEdit);
      setIsEditingDoneTask(true);
    } else {
      const taskToEdit = tasks[index];
      setTaskText(taskToEdit);
      setIsEditingDoneTask(false);
    }
    setEditMode(true);
    setEditIndex(index);
  };

  const deleteTask = (index, isDoneTask) => {
    if (isDoneTask) {
      const updatedDoneTasks = [...doneTasks];
      updatedDoneTasks.splice(index, 1);
      setDoneTasks(updatedDoneTasks);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  };

  const handleTaskCompletion = (index) => {
    const taskToMove = tasks[index];
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    setDoneTasks([...doneTasks, taskToMove]);
  };

  const handleDoneTaskCompletion = (index) => {
    const taskToMove = doneTasks[index];
    const updatedDoneTasks = doneTasks.filter((task, i) => i !== index);
    setDoneTasks(updatedDoneTasks);
    setTasks([...tasks, taskToMove]);
  };

  return (
    <>
      <h1>Todo List</h1>
      <TextField
        fullWidth
        label="Add Task"
        value={taskText}
        onChange={handleTaskChange}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={addTask}>
        {editMode ? 'Update Task' : 'Add Task'}
      </Button>
      {tasks.length > 0 && (
        <>
          <h2>Pending Tasks</h2>
          <List>
            {tasks.map((task, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${task}`} />
                <ListItemSecondaryAction>
                  <Checkbox onChange={() => handleTaskCompletion(index)} />
                  <IconButton edge="end" aria-label="edit" onClick={() => editTask(index, false)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index, false)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </>
      )}
      {doneTasks.length > 0 && (
        <div>
          <h2>Done Tasks</h2>
          <List>
            {doneTasks.map((task, index) => (
              <ListItem key={index}>
                <ListItemText primary={`${index + 1}. ${task}`} />
                <ListItemSecondaryAction>
                  <Checkbox onChange={() => handleDoneTaskCompletion(index)} checked />
                  <IconButton edge="end" aria-label="edit" onClick={() => editTask(index, true)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index, true)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
}

export default App;
