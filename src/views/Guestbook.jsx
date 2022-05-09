import React from 'react';
import { useUser } from '../context/UserContext';

export default function Guestbook() {
  const { logout } = useUser();
  return (
    <h1>Guestbook</h1>
    <button onClick={logout}>Sign out</button>
  );
}
