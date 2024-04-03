import { useMemo } from "react";

export const useGetRoles = () => {
  const roles = ["Teacher", "Student"];

  const role = useMemo(() => roles[Math.floor(Math.random() * 2)], []);

  return { role };
};