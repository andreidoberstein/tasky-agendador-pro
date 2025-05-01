
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Appointment } from '@/types';

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
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const allDaysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

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

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4 p-4">
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onAddAppointment} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground mb-1">
        <div className="py-2">Sun</div>
        <div className="py-2">Mon</div>
        <div className="py-2">Tue</div>
        <div className="py-2">Wed</div>
        <div className="py-2">Thu</div>
        <div className="py-2">Fri</div>
        <div className="py-2">Sat</div>
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
                {dayAppointments.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment.id}
                    className="calendar-event"
                    style={{ backgroundColor: appointment.color || '#3B82F6', color: 'white' }}
                    onClick={() => onSelectAppointment(appointment)}
                  >
                    {format(new Date(appointment.startTime), 'HH:mm')} {appointment.title}
                  </div>
                ))}
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-center text-gray-500 mt-1">
                    +{dayAppointments.length - 3} more
                  </div>
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
