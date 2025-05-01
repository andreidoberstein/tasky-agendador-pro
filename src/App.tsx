
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardTasksPage from "./pages/DashboardTasksPage";
import PasswordsPage from "./pages/PasswordsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { useEffect } from "react";

// Create a new query client instance
const queryClient = new QueryClient();

const App = () => {
  // Check if user is already logged in on app start
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      // If no authenticated user found, initialize to false
      localStorage.setItem('isAuthenticated', 'false');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Redirect root to dashboard if authenticated, otherwise to login */}
            <Route 
              path="/" 
              element={
                localStorage.getItem('isAuthenticated') === 'true' ? 
                  <Navigate to="/dashboard" replace /> : 
                  <Navigate to="/login" replace />
              } 
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/tasks" 
              element={
                <PrivateRoute>
                  <DashboardTasksPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/passwords" 
              element={
                <PrivateRoute>
                  <PasswordsPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/profile" 
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              } 
            />
            
            {/* Not found page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
