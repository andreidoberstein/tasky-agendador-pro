import { api } from './client'
import { User } from '@/types/user'

export const createUser = async (user: Partial<User>): Promise<User> => {
  const { data } = await api.post('create', user)
  return data
}
