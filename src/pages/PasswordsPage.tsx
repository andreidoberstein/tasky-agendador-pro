
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Eye, EyeOff, Plus, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';

interface PasswordEntry {
  id: string;
  description: string;
  password: string;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Descrição é obrigatória" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

const PasswordsPage = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([
    { id: '1', description: 'Email pessoal', password: 'senha123' },
    { id: '2', description: 'Banco', password: 'senhaSegura456' },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: '',
      password: '',
    },
  });

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newPassword: PasswordEntry = {
      id: Date.now().toString(),
      description: values.description,
      password: values.password,
    };

    setPasswords([...passwords, newPassword]);
    toast({
      title: "Senha salva",
      description: "Sua senha foi salva com sucesso."
    });
    setIsAddModalOpen(false);
    form.reset();
  };

  const handleDeletePassword = (id: string) => {
    setPasswords(passwords.filter(p => p.id !== id));
    toast({
      title: "Senha removida",
      description: "Sua senha foi removida com sucesso."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gerenciador de Senhas</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Senha
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {passwords.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.description}</CardTitle>
                <CardDescription>Senha salva</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Input 
                    type={visiblePasswords[entry.id] ? "text" : "password"} 
                    value={entry.password} 
                    readOnly 
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => togglePasswordVisibility(entry.id)}
                  >
                    {visiblePasswords[entry.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeletePassword(entry.id)}
                  className="ml-auto"
                >
                  <Trash className="h-4 w-4 mr-2" /> Remover
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Nova Senha</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Email do trabalho" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Salvar Senha</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default PasswordsPage;
