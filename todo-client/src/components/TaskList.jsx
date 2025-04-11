import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/tasks', { withCredentials: true });
      setTasks(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des tâches', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des tâches</h2>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} refreshTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
