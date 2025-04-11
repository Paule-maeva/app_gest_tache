import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from "./pages/PrivateRoute";


function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
            </Routes>
        </Router>
    );
}

export default App;
