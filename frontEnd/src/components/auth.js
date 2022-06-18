import { useState, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeCall, setActiveCall] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [iframe, setIframe] = useState(null);




  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, activeCall, setActiveCall, isConnected, setIsConnected, iframe, setIframe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
