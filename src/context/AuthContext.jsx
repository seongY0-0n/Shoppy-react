import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const Authcontext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  return (
    <Authcontext.Provider value={{ user, login, logout }}>
      {children}
    </Authcontext.Provider>
  );
}

export function useAuthContext() {
  return useContext(Authcontext);
}
