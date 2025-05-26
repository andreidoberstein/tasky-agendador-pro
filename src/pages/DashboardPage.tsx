
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CalendarView from '@/components/CalendarView';
import AppointmentModal from '@/components/AppointmentModal';
import AppointmentDetail from '@/components/AppointmentDetail';
import { Appointment, mockData } from '@/types';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';
import { createAppointment, getAppointments } from '@/lib/api/appointments'

const DashboardPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(false); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);
  
  const fetchAppointmnets = async () => {
    const data = async () => {
      try {
        const appData = await getAppointments()
        console.log(appData.data)
        setAppointments(appData.data)

      } catch (error) {
        console.error('Error fetching ', error)
      }
    }
    data()
  }

  useEffect(() => {
    fetchAppointmnets()
  }, [reload])

  const handleRefresh = () => {
    setReload(prev => !prev); // toggles to trigger useEffect
  };

  const handleAddAppointment = () => {
    setSelectedAppointment(undefined);
    setIsAddModalOpen(true);
  };

  const handleSaveAppointment = async  (appointment: Partial<Appointment>) => {
    if (appointment.id) {
      // Update existing appointment
      // setAppointments(appointments.map(a => 
      //   a.id === appointment.id ? { ...a, ...appointment } : a
      // ));
      toast({
        title: "Compromisso atualizado",
        description: "Seu compromisso foi atualizado com sucesso."
      });
      setIsEditModalOpen(false);
    } else {
      // Create new appointment
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        title: appointment.title || '',
        description: appointment.description,
        location: appointment.location,
        startTime: appointment.startTime || new Date(),
        endTime: appointment.endTime || new Date(),
        status: appointment.status || 'SCHEDULED',
        createdAt: new Date(),
        updatedAt: new Date(),
        color: appointment.color,
        userId: "5d390a97-4c1e-481a-b8c9-098b9184d8a5"
      };
      // setAppointments([...appointments, newAppointment]);

      const response = await createAppointment(newAppointment)

      if(response.status == 201) {
        toast({
          title: "Compromisso criado",
          description: "Seu compromisso foi criado com sucesso."
        });
        setIsAddModalOpen(false);
        handleRefresh()
      }      
    }
  };

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailModalOpen(true);
  };

  const handleEditAppointment = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleDeleteAppointment = () => {
    if (selectedAppointment) {
      // setAppointments(appointments.filter(a => a.id !== selectedAppointment.id));
      toast({
        title: "Compromisso excluído",
        description: "Seu compromisso foi excluído com sucesso."
      });
      setIsDetailModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <CalendarView
        appointments={appointments}
        onAddAppointment={handleAddAppointment}
        onSelectAppointment={handleSelectAppointment}
      />

      <AppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveAppointment}
        isEditing={false}
      />

      {selectedAppointment && (
        <>
          <AppointmentModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveAppointment}
            appointment={selectedAppointment}
            isEditing={true}
          />

          <AppointmentDetail
            isOpen={isDetailModalOpen}
            onClose={() => setIsDetailModalOpen(false)}
            appointment={selectedAppointment}
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default DashboardPage;
