
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import TaskList from '@/components/TaskList';
import TaskModal from '@/components/TaskModal';
import { Task, mockData } from '@/types';
import { toast } from '@/hooks/use-toast';

const DashboardTasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(mockData.tasks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  const handleAddTask = () => {
    setSelectedTask(undefined);
    setIsAddModalOpen(true);
  };

  const handleSaveTask = (task: Partial<Task>) => {
    if (task.id) {
      // Update existing task
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, ...task, updatedAt: new Date() } : t
      ));
      toast({
        title: "Tarefa atualizada",
        description: "Sua tarefa foi atualizada com sucesso."
      });
      setIsEditModalOpen(false);
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now().toString(),
        title: task.title || '',
        description: task.description,
        completed: false,
        dueDate: task.dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: mockData.currentUser.id
      };
      setTasks([...tasks, newTask]);
      toast({
        title: "Tarefa criada",
        description: "Sua tarefa foi criada com sucesso."
      });
      setIsAddModalOpen(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const completed = !task.completed;
        if (completed) {
          toast({
            title: "Tarefa concluída",
            description: "Bom trabalho! Tarefa marcada como concluída."
          });
        }
        return { ...task, completed, updatedAt: new Date() };
      }
      return task;
    }));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Tarefa excluída",
      description: "Sua tarefa foi excluída com sucesso."
    });
  };

  return (
    <DashboardLayout>
      <TaskList
        tasks={tasks}
        onToggleTask={handleToggleTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onAddTask={handleAddTask}
      />

      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveTask}
        isEditing={false}
      />

      {selectedTask && (
        <TaskModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveTask}
          task={selectedTask}
          isEditing={true}
        />
      )}
    </DashboardLayout>
  );
};

export default DashboardTasksPage;
