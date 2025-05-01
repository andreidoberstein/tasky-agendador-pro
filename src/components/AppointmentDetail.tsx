
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Appointment } from '@/types';
import { format } from 'date-fns';
import { Clock, Edit, MapPin, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AppointmentDetailProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onEdit: () => void;
  onDelete: () => void;
}

const AppointmentDetail: React.FC<AppointmentDetailProps> = ({
  isOpen,
  onClose,
  appointment,
  onEdit,
  onDelete
}) => {
  const getStatusBadgeVariant = () => {
    switch (appointment.status) {
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{appointment.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <Badge variant={getStatusBadgeVariant() as any}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={onEdit}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="text-destructive" onClick={onDelete}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Clock className="h-4 w-4" />
            <span>
              {format(new Date(appointment.startTime), 'EEEE, MMM d, yyyy')}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Clock className="h-4 w-4 opacity-0" />
            <span>
              {format(new Date(appointment.startTime), 'h:mm a')} - {format(new Date(appointment.endTime), 'h:mm a')}
            </span>
          </div>
          
          {appointment.location && (
            <div className="flex items-center gap-2 text-muted-foreground mb-4 pb-4 border-b">
              <MapPin className="h-4 w-4" />
              <span>{appointment.location}</span>
            </div>
          )}
          
          {appointment.description && (
            <div className="mb-4 pb-4 border-b">
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-muted-foreground">{appointment.description}</p>
            </div>
          )}
          
          <div>
            <h3 className="font-medium mb-1">Participants</h3>
            <div className="text-muted-foreground">
              {appointment.participants && appointment.participants.length > 0 ? (
                appointment.participants.map(user => (
                  <div key={user.id} className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <span>{user.name}</span>
                  </div>
                ))
              ) : (
                <span>No participants</span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDetail;
