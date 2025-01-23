import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAdminRoute?: boolean; // Add this line to accept the isAdminRoute prop
}

export default function ProtectedRoute({ children, isAdminRoute }: ProtectedRouteProps) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isAdminRoute && user.role !== 'admin') {
    return <Navigate to="/profile" replace />; // Redirect to profile if not admin
  }

  return <>{children}</>;
}
