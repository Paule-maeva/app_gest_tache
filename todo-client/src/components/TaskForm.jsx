import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await axios.post(
        'http://localhost:8000/api/tasks', 
        { title }, 
        { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      setTitle('');
      onSuccess(); // Rafraîchir la liste des tâches après l'ajout
      setError(''); // Réinitialiser l'erreur
    } catch (err) {
      console.error('Erreur lors de l\'ajout de la tâche', err);
      setError('Erreur lors de la création de la tâche');
    }
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
      <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded">
        Ajouter
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default TaskForm;
