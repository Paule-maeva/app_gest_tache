import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
  const [refresh, setRefresh] = React.useState(false);

  const refreshTasks = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="bg-white from-purple-600 to-indigo-900 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg flex flex-col w-[900px] max-w-full overflow-hidden p-10">
        <h2 className="text-purple-700 text-3xl font-bold mb-4 text-center">Mon Tableau de Bord</h2>
         

        <TaskForm refreshTasks={refreshTasks} />

        <div className="mt-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400">
          <TaskList key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
