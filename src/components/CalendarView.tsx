import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, isSameDay, setDefaultOptions } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button';
import { CalendarPlus2, ChevronLeft, ChevronRight, LucideCalendarPlus, Plus } from 'lucide-react';
import { Appointment } from '@/types/index';
import AppointmentsDayModal from './AppointmentsDay';
import { useIsMobile } from '@/hooks/use-mobile';
setDefaultOptions({ locale: ptBR })

interface CalendarViewProps {
  appointments: Appointment[];
  onAddAppointment: () => void;
  onSelectAppointment: (appointment: Appointment) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  appointments,
  onAddAppointment,
  onSelectAppointment
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMobile = useIsMobile();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const allDaysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  const handleShowMore = (appointments) => {
    setSelectedAppointments(appointments);
    setShowModal(true);
  };
  

  // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startDayOfWeek = firstDayOfMonth.getDay();
  
  // Create an array for the days to display in the calendar grid
  const daysToDisplay = [];
  
  // Add days from previous month to align with the correct day of the week
  for (let i = 0; i < startDayOfWeek; i++) {
    const prevMonthDay = new Date(firstDayOfMonth);
    prevMonthDay.setDate(prevMonthDay.getDate() - (startDayOfWeek - i));
    daysToDisplay.push(prevMonthDay);
  }
  
  // Add all days of the current month
  daysToDisplay.push(...allDaysInMonth);
  
  // Add days from next month to complete the grid
  const remainingDays = 42 - daysToDisplay.length; // 6 rows * 7 columns = 42 cells
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonthDay = new Date(lastDayOfMonth);
    nextMonthDay.setDate(nextMonthDay.getDate() + i);
    daysToDisplay.push(nextMonthDay);
  }

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(appointment => 
      isSameDay(new Date(appointment.startTime), day)
    );
  };

  // Calculate the height for calendar days based on device
  const calendarDayHeight = isMobile ? 'h-20' : 'h-24'; 
  
  // Determine the maximum number of events to display before showing +more
  const maxEventsToShow = isMobile ? 2 : 3;

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4 p-2 md:p-4">
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-base md:text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onAddAppointment} size="sm">
          <LucideCalendarPlus className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Adicionar</span>
        </Button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground mb-1">
        <div className="py-1">D</div>
        <div className="py-1">S</div>
        <div className="py-1">T</div>
        <div className="py-1">Q</div>
        <div className="py-1">Q</div>
        <div className="py-1">S</div>
        <div className="py-1">S</div>
      </div>

      <div className="grid grid-cols-7 h-[calc(100vh-240px)] bg-white border-t">
        {daysToDisplay.map((day, index) => {
          const dayAppointments = getAppointmentsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={index}
              className={`calendar-day ${
                isCurrentMonth ? 'calendar-day-current-month' : 'calendar-day-other-month'
              } ${isToday(day) ? 'calendar-day-today' : ''}`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-xs ${isToday(day) ? 'font-bold bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center' : ''}`}>
                  {format(day, 'd')}
                </span>
                {dayAppointments.length > 0 && !isToday(day) && (
                  <span className="text-xs px-1 rounded-full bg-primary text-white">
                    {dayAppointments.length}
                  </span>
                )}
              </div>
              <div className="mt-1 max-h-[80%] overflow-y-auto">
                {dayAppointments.slice(0, 2).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="calendar-event"
                    style={{ backgroundColor: appointment.color || '#3B82F6', color: 'white' }}
                    onClick={() => onSelectAppointment(appointment)}
                  >
                    {format(new Date(appointment.startTime), 'HH:mm')} {appointment.title}
                  </div>
                ))}
                {dayAppointments.length > 2 && (                  
                  <div
                    className="text-xs text-center text-gray-500 mt-1 cursor-pointer hover:underline"
                    onClick={() => handleShowMore(dayAppointments)}
                  >
                    +{dayAppointments.length - 2} more
                    
                  </div>
                )}
                {showModal && (
                      <AppointmentsDayModal
                        appointments={selectedAppointments}
                        onClose={() => setShowModal(false)}
                        onSelectAppointment={(appointment) => {
                          onSelectAppointment(appointment);
                          setShowModal(false); // fecha após selecionar
                        }}                                       
                      />
                    )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
