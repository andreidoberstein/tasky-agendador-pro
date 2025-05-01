
import React from 'react';
import { Task } from '@/types';
import { Check, Edit, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onAddTask: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onAddTask
}) => {
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <Button onClick={onAddTask} size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Pending ({pendingTasks.length})</h3>
        <div className="bg-white rounded-md border overflow-hidden">
          {pendingTasks.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No pending tasks
            </div>
          ) : (
            pendingTasks.map(task => (
              <div key={task.id} className="task-item">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                  className="h-5 w-5"
                />
                <div className="flex-1">
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-muted-foreground">{task.description}</div>
                  )}
                  {task.dueDate && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEditTask(task)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Completed ({completedTasks.length})</h3>
        <div className="bg-white rounded-md border overflow-hidden">
          {completedTasks.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No completed tasks
            </div>
          ) : (
            completedTasks.map(task => (
              <div key={task.id} className="task-item opacity-70">
                <div className="h-5 w-5 rounded-full bg-success flex items-center justify-center text-white">
                  <Check className="h-3 w-3" />
                </div>
                <div className="flex-1">
                  <div className="font-medium line-through">{task.title}</div>
                  {task.description && (
                    <div className="text-sm text-muted-foreground line-through">{task.description}</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
