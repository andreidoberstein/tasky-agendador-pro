
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Acesso negado",
        description: "Por favor, faça login para acessar esta página.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
