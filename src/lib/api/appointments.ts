import { Appointment } from "@/types";
import { api } from "./client";

export async function createAppointment(data: Appointment) {
  return await api.post("appointments", data);
}

export async function getAppointments() { //}: Promise<Appointment[]> {
  return await api.get("appointments");
}
