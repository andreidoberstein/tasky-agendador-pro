
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CalendarView from '@/components/CalendarView';
import AppointmentModal from '@/components/AppointmentModal';
import AppointmentDetail from '@/components/AppointmentDetail';
import { Appointment, mockData } from '@/types';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const DashboardPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockData.appointments);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);

  const handleAddAppointment = () => {
    setSelectedAppointment(undefined);
    setIsAddModalOpen(true);
  };

  const handleSaveAppointment = (appointment: Partial<Appointment>) => {
    if (appointment.id) {
      // Update existing appointment
      setAppointments(appointments.map(a => 
        a.id === appointment.id ? { ...a, ...appointment } : a
      ));
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
        status: appointment.status || 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: mockData.currentUser.id,
        color: appointment.color,
      };
      setAppointments([...appointments, newAppointment]);
      toast({
        title: "Compromisso criado",
        description: "Seu compromisso foi criado com sucesso."
      });
      setIsAddModalOpen(false);
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
      setAppointments(appointments.filter(a => a.id !== selectedAppointment.id));
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
