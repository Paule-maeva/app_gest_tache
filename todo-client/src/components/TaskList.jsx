import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/tasks', 
        { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      setTasks(res.data);
      setError(''); // Réinitialiser l'erreur
    } catch (err) {
      console.error('Erreur lors du chargement des tâches', err);
      setError('Erreur lors du chargement des tâches');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refresh]); // Recharger les tâches à chaque changement de `refresh`

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des tâches</h2>
      {error && <p className="text-red-500">{error}</p>}
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} refreshTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
