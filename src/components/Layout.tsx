
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold md:text-xl">Tasky</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/profile" className="relative h-8 w-8 overflow-hidden rounded-full">
            <span className="flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground">
              JD
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 pb-16 pt-2">{children}</main>
      
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background">
        <Tabs defaultValue={currentPath === "/" ? "calendar" : "tasks"} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <Link to="/">
              <TabsTrigger value="calendar" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Calendar</span>
              </TabsTrigger>
            </Link>
            <Link to="/tasks">
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Tasks</span>
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </footer>
    </div>
  );
};

export default Layout;
