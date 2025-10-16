import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';

function RoleProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  const isAuthorized = user && allowedRoles?.includes(user.type);

  if (isAuthorized) {
    return <Outlet />;
  }
  
  return <Navigate to="/" replace />;
}

export default RoleProtectedRoute;