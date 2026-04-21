import { useState, useEffect } from 'react';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin token exists in localStorage
    const token = localStorage.getItem('admin_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const login = (password: string) => {
    // In production, this should verify against a backend
    // For now, using a simple client-side check
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_token', 'authenticated');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, loading, login, logout };
};
