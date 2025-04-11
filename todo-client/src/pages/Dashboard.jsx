import React from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const Dashboard = () => {
  const [refresh, setRefresh] = React.useState(false);

  const refreshTasks = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList key={refresh} />
    </div>
  );
};

export default Dashboard;
