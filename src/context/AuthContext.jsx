import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { storage } from '../services/localStorageService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    storage.seed();
    setUsers(storage.get(storage.keys.users, []));
    setCurrentUser(storage.get(storage.keys.currentUser, null));
  }, []);

  const persistUsers = (next) => {
    setUsers(next);
    storage.set(storage.keys.users, next);
  };

  const signup = ({ name, email, password, interests }) => {
    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, message: 'An account with this email already exists.' };
    }
    const user = { id: `u-${Date.now()}`, name, email, password, interests, role: 'user' };
    persistUsers([...users, user]);
    setCurrentUser(user);
    storage.set(storage.keys.currentUser, user);
    return { ok: true, user };
  };

  const login = ({ email, password }) => {
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password);
    if (!user) return { ok: false, message: 'Email or password does not match a demo account.' };
    setCurrentUser(user);
    storage.set(storage.keys.currentUser, user);
    return { ok: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(storage.keys.currentUser);
  };

  const updateProfile = (updates) => {
    const updated = { ...currentUser, ...updates };
    const next = users.map((user) => (user.id === updated.id ? updated : user));
    persistUsers(next);
    setCurrentUser(updated);
    storage.set(storage.keys.currentUser, updated);
  };

  const value = useMemo(() => ({ users, currentUser, signup, login, logout, updateProfile }), [users, currentUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
