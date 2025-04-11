import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apiClient/axios';

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
   

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', form);
      alert('Inscription réussie !');
      navigate('/login');
    } catch (error) {
      console.error('Erreur inscription:', error);
      alert("Échec de l'inscription");
    }
  };

  return (
    <div className="bg-white from-purple-600 to-indigo-900 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg flex w-[800px] max-w-full overflow-hidden ml-70">
        {/* Left Side with Image */}
        <div className="w-1/2 bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-6">
          <img
            src="/2756685.jpg"
            alt="Illustration"
            className="w-full h-full object-cover rounded-l-3xl"
          />
        </div>

        {/* Right Side: Register Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-purple-700 text-2xl font-semibold mb-2">Bienvenue !</h2>
          <h3 className="text-gray-800 text-xl mb-6">Créer un compte</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 py-2"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 py-2 pr-10"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 cursor-pointer"
              >
                {showPassword ? '👁️' : '🔒'}
              </span>
            </div>

            

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-full hover:from-purple-700 hover:to-indigo-700 transition"
            >
              S'inscrire
            </button>
            <div className="text-sm text-purple-600 mt-3 text-center">
              <a href="/login" className="hover:underline">Déjà un compte ? Connecte-toi</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
