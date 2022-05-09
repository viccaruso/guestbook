import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getEntries } from '../services/entries';

export default function Guestbook() {
  const { logout } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getEntries()
      .then((results) => setEntries(results))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1>Guestbook</h1>
      <button onClick={logout}>Sign out</button>
      {loading ? (
        <p>Loading guestbook entries...</p>
      ) : (
        <div>
          {entries.map((entry, index) => (
            <p key={index}>{entry.content}</p>
          ))}
        </div>
      )}
    </>
  );
}
