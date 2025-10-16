import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';
import Loader from '@/components/Loader';

function GuestRoute() {
  const { user, isSessionLoading } = useAuth();

  if (isSessionLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestRoute;