import { format } from 'date-fns';

const AppointmentsDayModal = ({ appointments, onClose, onSelectAppointment }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Agendamentos do dia</h2>
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-2 rounded bg-blue-500 text-white cursor-pointer"
              onClick={() => onSelectAppointment(appointment)}
            >
              {format(new Date(appointment.startTime), 'HH:mm')} {appointment.title}
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={() => onClose()}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default AppointmentsDayModal;

// import { Appointment } from '@/types';
// import { format } from 'date-fns';

// interface ModalProps {
//   onClose: () => void
//   appointments?: Appointment;
// }

// export function AppointmentsDayModal({ appointments, onClose, onSelectAppointment }) {
//   return (   
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full">
//           <h2 className="text-lg font-bold mb-4">Agendamentos do dia</h2>
//           <div className="space-y-2 max-h-[300px] overflow-y-auto">
//             {appointments.map((appointment) => (
//               <div
//                 key={appointment.id}
//                 className="p-2 rounded bg-blue-500 text-white cursor-pointer"
//                 onClick={() => {
//                   onSelectAppointment(appointment);
//                 }}
//               >
//                 {format(new Date(appointment.startTime), 'HH:mm')} {appointment.title}
//               </div>
//             ))}
//           </div>
//           <button
//             className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
//             onClick={onClose}
//           >
//             Fechar
//           </button>
//         </div>
//       </div>
//   )
// }