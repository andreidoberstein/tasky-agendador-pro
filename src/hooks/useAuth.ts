'use client'

import { useState } from "react"

export function useAuth() {
  const [user, setUser] = useState(null)


  const login = async (email: string, pass: string) => {
    const data = await login(email, pass)
    setUser(data)
  }

  return user
}