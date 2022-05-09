import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { getEntries, createEntry } from '../services/entries';

export default function Guestbook() {
  const { logout, user } = useUser();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textContent, setTextContent] = useState('');

  useEffect(() => {
    setLoading(true);

    getEntries()
      .then((results) => setEntries(results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const entry = await createEntry({ userId: user.id, content: textContent });
    setLoading(true);
    const results = await getEntries();
    setEntries(results);
    setLoading(false);
  }

  return (
    <>
      <h1>Guestbook</h1>
      <p>{`Welcome back, ${user.email}`}</p>
      <button onClick={logout}>Sign out</button>
      {loading ? (
        <p>Loading guestbook entries...</p>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <textarea
              aria-label="textbox to add a new guestbook entry"
              style={{ height: '100px', width: '400px' }}
              required
              value={textContent}
              onChange={(event) => setTextContent(event.target.value)}
            />
            <button type="submit">Add to guestbook</button>
          </form>
          <h3>Latest Entries</h3>
          {entries.map((entry, index) => (
            <p
              key={index}
            >{`${entry.content} - by ${user.email} at ${entry.created_at}`}</p>
          ))}
        </div>
      )}
    </>
  );
}
