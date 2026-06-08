import { createContext, useState, useContext } from 'react';

const UserContext = createContext();

 function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [salary, setSalary] = useState(null);        // monthly net salary
  const [selectedTrack, setSelectedTrack] = useState(null);

  function register({ name, email, password }) {
    const newUser = { name, email, password };
    localStorage.setItem('alphaUser', JSON.stringify(newUser));
    setUser(newUser);
  }

 function login({ email, password }) {
    const stored = localStorage.getItem('alphaUser');
    if (!stored) return false;
    const parsed = JSON.parse(stored);
    if (parsed.email === email && parsed.password === password) {
      setUser(parsed);
      return true;
    }
    return false;
  }

  function logout() {
    setUser(null);
  }

  const value = {
    user, 
    setUser,
    login,
    register,
    logout,  
    salary,
    setSalary,
    selectedTrack,
    setSelectedTrack,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}


function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
}

export { UserProvider, useUser, UserContext };