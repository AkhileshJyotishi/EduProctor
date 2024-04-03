"use client"
import React, { useEffect, useState } from "react"

interface IUserContext {
    role: string
}

interface IUserProvider {
  children: React.ReactNode
}

const Context = React.createContext<IUserContext>({} as IUserContext)

const RolesProvider = ({ children }: IUserProvider) => {
    const roles = ["Teacher", "Student"];
    const [role, setRole] = useState("");
  
    useEffect(() => {
      // Choose a random role when the component mounts
      const randomRole = roles[Math.floor(Math.random() * 2)];
      setRole(randomRole);
    }, []);
  





  return (
    <Context.Provider
      value={{
        role
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useRolesContext = () => {
  const c = React.useContext(Context)

  if (c === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return c
}

export { RolesProvider, useRolesContext }