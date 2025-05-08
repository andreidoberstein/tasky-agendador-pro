import { Appointment } from "@/types";
import { api } from "./client";

export async function createAppointment(data: Appointment) {
  return await api.post('appointments', data)
}