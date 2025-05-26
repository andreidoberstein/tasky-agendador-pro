import { Appointment } from "@/types";
import { api } from "./client";

export async function createAppointment(data: Appointment) {
  return await api.post("appointments", data);
}

export async function getAppointments() {
  return await api.get("appointments");
}

export async function deleteAppointment(id: string) {
  return await api.delete("appointments/" + id);
}
