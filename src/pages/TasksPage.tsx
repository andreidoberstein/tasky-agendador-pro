
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TaskList from '@/components/TaskList';
import TaskModal from '@/components/TaskModal';
import { Task, mockData } from '@/types';
import { toast } from '@/hooks/use-toast';

const TasksPage = () => {
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
        title: "Task updated",
        description: "Your task has been updated successfully."
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
        title: "Task created",
        description: "Your task has been created successfully."
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
            title: "Task completed",
            description: "Nice work! Task marked as completed."
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
      title: "Task deleted",
      description: "Your task has been deleted successfully."
    });
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default TasksPage;
