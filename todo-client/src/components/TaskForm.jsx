import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ refreshTasks }) => {
  const [title, setTitle] = useState('');

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await axios.post('http://localhost:8000/api/tasks', { title }, { withCredentials: true });
    setTitle('');
    refreshTasks();
  };

  return (
    <form onSubmit={createTask} className="mb-4">
      <input
        type="text"
        placeholder="Nouvelle tâche..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded mr-2 w-2/3"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Ajouter
      </button>
    </form>
  );
};

export default TaskForm;
