import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, refreshTasks }) => {
  const toggleTask = async () => {
    try {
      await axios.patch(
        `http://localhost:8000/api/tasks/${task.id}/toggle`, 
        {},
        { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      refreshTasks();
    } catch (err) {
      console.error('Erreur lors de la modification de l\'état de la tâche', err);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/tasks/${task.id}`, 
        { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      refreshTasks();
    } catch (err) {
      console.error('Erreur lors de la suppression de la tâche', err);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-2 flex justify-between items-center">
      <div>
        <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={toggleTask} 
          className={`px-2 py-1 rounded ${task.completed ? 'bg-gray-500' : 'bg-green-500'} text-black`}
        >
          {task.completed ? 'Non terminé' : 'Terminé'}
        </button>
        <button onClick={deleteTask} className="bg-red-500 text-black px-2 py-1 rounded">
          Supprimer
        </button>
        <button onClick={deleteTask} className="bg-yellow-500 text-black px-2 py-1 rounded">
        modifier
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
