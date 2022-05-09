import { createContext, useContext, useState } from 'react';
import { getUser, signInUser, signOutUser, signUpUser } from '../services/user';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const currentUser = getUser();
  const [user, setUser] = useState(currentUser || { email: null });

  async function login(email, password) {
    const authedUser = await signInUser({ email, password });

    if (authedUser) {
      setUser(authedUser);
    }
  }

  async function signUp(email, password) {
    const authedUser = await signUpUser({ email, password });

    if (authedUser) {
      setUser(authedUser);
    }
  }

  async function logout() {
    setUser(await signOutUser());
  }

  return (
    <UserContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
