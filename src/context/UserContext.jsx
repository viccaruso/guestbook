import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

import React from 'react';

export function UserProvider({ children }) {
  const [user, setUser] = useState({ email: null });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}{' '}
    </UserContext.Provider>
  );
}
