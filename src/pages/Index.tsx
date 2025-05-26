
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import CalendarView from '@/components/CalendarView';
import AppointmentModal from '@/components/AppointmentModal';
import AppointmentDetail from '@/components/AppointmentDetail';
import { Appointment, mockData } from '@/types';
import { toast } from '@/hooks/use-toast';
import { getAppointments } from '@/lib/api/appointments';

const Index = () => {
  const [appointments, setAppointments] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);

  useEffect(() => {
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
  }, [])

  const handleAddAppointment = () => {
    setSelectedAppointment(undefined);
    setIsAddModalOpen(true);
  };

  const handleSaveAppointment = (appointment: Partial<Appointment>) => {
    if (appointment.id) {
      // Update existing appointment
      // setAppointments(appointments.map(a => 
      //   a.id === appointment.id ? { ...a, ...appointment } : a
      // ));
      toast({
        title: "Appointment updated",
        description: "Your appointment has been updated successfully."
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
        userId: mockData.currentUser.id,
        color: appointment.color,
      };
      // setAppointments([...appointments, newAppointment]);
      toast({
        title: "Appointment created",
        description: "Your appointment has been created successfully."
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
      // setAppointments(appointments.filter(a => a.id !== selectedAppointment.id));
      toast({
        title: "Appointment deleted",
        description: "Your appointment has been deleted successfully."
      });
      setIsDetailModalOpen(false);
    }
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export default Index;
