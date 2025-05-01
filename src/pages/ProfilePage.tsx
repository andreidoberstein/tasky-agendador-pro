
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { mockData } from '@/types';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser } = mockData;

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <Layout>
      <div className="p-4">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="pb-0">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-semibold mb-4">
                {currentUser.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Account</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Joined</span>
                <span className="font-medium">May 2025</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full text-destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
