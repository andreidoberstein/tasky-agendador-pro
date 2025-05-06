import { User } from "@/types";
import { api } from "./client";

export async function login(data: Partial<User>) {
  
  return await api.post("auth/login", data);
}
