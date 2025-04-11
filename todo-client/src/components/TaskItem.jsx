import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, refreshTasks }) => {
  const toggleTask = async () => {
    await axios.patch(`http://localhost:8000/api/tasks/${task.id}/toggle`, {}, { withCredentials: true });
    refreshTasks();
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:8000/api/tasks/${task.id}`, { withCredentials: true });
    refreshTasks();
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-2 flex justify-between items-center">
      <div>
        <p className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={toggleTask} className="bg-green-500 text-white px-2 py-1 rounded">
          {task.completed ? 'Non terminé' : 'Terminé'}
        </button>
        <button onClick={deleteTask} className="bg-red-500 text-white px-2 py-1 rounded">Supprimer</button>
      </div>
    </div>
  );
};

export default TaskItem;
