import axios from 'axios';

// Créer une instance d'Axios pour l'API Laravel
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Remplace avec l'URL de ton API Laravel
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Ajouter un intercepteur pour envoyer le token dans l'en-tête Authorization si disponible
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // On récupère le token du localStorage (ou du cookie)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // Ajouter le token à l'en-tête Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
