
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Calendar, CheckCircle, Key, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Desconectado",
      description: "Você foi desconectado com sucesso."
    });
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <h2 className="font-bold text-lg">Tasky Admin</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Calendário" asChild>
                  <button onClick={() => navigate('/dashboard')}>
                    <Calendar className="h-4 w-4" />
                    <span>Calendário</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Tarefas" asChild>
                  <button onClick={() => navigate('/dashboard/tasks')}>
                    <CheckCircle className="h-4 w-4" />
                    <span>Tarefas</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Senhas" asChild>
                  <button onClick={() => navigate('/dashboard/passwords')}>
                    <Key className="h-4 w-4" />
                    <span>Gerenciador de Senhas</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Perfil" asChild>
                  <button onClick={() => navigate('/dashboard/profile')}>
                    <User className="h-4 w-4" />
                    <span>Perfil</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Desconectar</span>
            </Button>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 overflow-auto">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-medium">Painel de Controle</h1>
            </div>
          </div>
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
