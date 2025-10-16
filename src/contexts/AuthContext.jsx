import React, { createContext, useState, useEffect } from 'react';
import api from '@/services/api.js';
import { useLoading } from '@/hooks/useLoading.js';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const { showLoader, hideLoader } = useLoading();
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedToken = localStorage.getItem('@ConectaELLP:token');
      if (storagedToken) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
          const response = await api.get('/users/me');
          setUser(response.data);
          setToken(storagedToken);
        } catch (error) {
          console.error("Token armazenado inválido, limpando...", error);
          localStorage.removeItem('@ConectaELLP:token');
        }
      }
      setIsSessionLoading(false);
    }
    loadStoragedData();
  }, []);

  async function handleLogin({ email, password }) {
    showLoader();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user: userData, token: userToken } = response.data;

      localStorage.setItem('@ConectaELLP:token', userToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

      setUser(userData);
      setToken(userToken);
    } catch (error) {
      console.error('Erro no login:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Erro ao fazer login.');
    } finally {
      hideLoader();
    }
  }

  function handleLogout() {
    showLoader();
    setUser(null);
    setToken(null);
    localStorage.removeItem('@ConectaELLP:token');
    api.defaults.headers.common['Authorization'] = null;
    hideLoader();
  }

  return (
    <AuthContext.Provider value={{ user, token, isSessionLoading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };