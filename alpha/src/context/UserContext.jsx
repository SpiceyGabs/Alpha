import { createContext, useState, useContext } from 'react';

const UserContext = createContext();


export function UserProvider({ children }) {
  const [salary, setSalary] = useState(null);        // monthly net salary
  const [selectedTrack, setSelectedTrack] = useState(null);

  const value = {
    salary,
    setSalary,
    selectedTrack,
    setSelectedTrack,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}


export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}