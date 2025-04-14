import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apiClient/axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('Échec de la connexion');
    }
  };

  return (
    <div className="bg-white from-purple-600 to-indigo-900 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg flex w-[700px] max-w-full overflow-hidden ml-80">
        {/* Left Side with Image */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-6">
          <img
            src="/2756685.jpg"
            alt="Illustration"
            className="w-full h-full object-cover rounded-l-3xl"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-purple-700 text-3xl font-bold mb-2 text-center">Bon retour</h2>
          <h3 className="text-gray-800 text-lg mb-6 text-center">Connecte-toi à ton compte</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 py-2"
            />

            {/* Mot de passe avec icône œil */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 py-2 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-2xl text-purple-600"
                title={showPassword ? 'Masquer' : 'Afficher'}
              >
               {showPassword ? '👁️' : '🔒'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transition"
            >
              Connexion
            </button>

            <div className="flex justify-between text-sm text-purple-600 mt-3">
              <a href="#" className="hover:underline">Créer un compte</a>
            
              <a href="#" className="hover:underline">Mot de passe oublié ?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
