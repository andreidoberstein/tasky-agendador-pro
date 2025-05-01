
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Appointment {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  participants?: User[];
  files?: AppointmentFile[];
  color?: string;
}

export interface AppointmentFile {
  id: string;
  name: string;
  url: string;
  type: string;
  appointmentId: string;
}

// Mock data helper
export const generateMockData = () => {
  const currentUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Prepare presentation',
      description: 'Finalize slides for the client meeting',
      completed: false,
      dueDate: tomorrow,
      createdAt: yesterday,
      updatedAt: yesterday,
      userId: currentUser.id
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and vegetables',
      completed: true,
      dueDate: today,
      createdAt: yesterday,
      updatedAt: today,
      userId: currentUser.id
    },
    {
      id: '3',
      title: 'Call dentist',
      description: 'Schedule annual checkup',
      completed: false,
      dueDate: nextWeek,
      createdAt: yesterday,
      updatedAt: yesterday,
      userId: currentUser.id
    },
    {
      id: '4',
      title: 'Submit expense report',
      completed: false,
      dueDate: tomorrow,
      createdAt: today,
      updatedAt: today,
      userId: currentUser.id
    },
    {
      id: '5',
      title: 'Review project proposal',
      description: 'Make notes for team meeting',
      completed: false,
      createdAt: today,
      updatedAt: today,
      userId: currentUser.id
    }
  ];
  
  const appointments: Appointment[] = [
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly status update with product team',
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
      status: 'scheduled',
      createdAt: yesterday,
      updatedAt: yesterday,
      userId: currentUser.id,
      color: '#3B82F6'
    },
    {
      id: '2',
      title: 'Dentist Appointment',
      location: 'Smile Dental Clinic',
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 14, 30),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 15, 30),
      status: 'scheduled',
      createdAt: yesterday,
      updatedAt: yesterday,
      userId: currentUser.id,
      color: '#F59E0B'
    },
    {
      id: '3',
      title: 'Project Deadline',
      description: 'Final submission for client project',
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 18, 0),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 18, 30),
      status: 'scheduled',
      createdAt: yesterday,
      updatedAt: yesterday,
      userId: currentUser.id,
      color: '#EF4444'
    },
    {
      id: '4',
      title: 'Coffee with David',
      location: 'Starbucks',
      startTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 15, 0),
      endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 0),
      status: 'scheduled',
      createdAt: yesterday,
      updatedAt: yesterday,
      userId: currentUser.id,
      color: '#8B5CF6'
    }
  ];
  
  return { currentUser, tasks, appointments };
};

export const mockData = generateMockData();
