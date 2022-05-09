import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Auth() {
  const { login, signUp } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const history = useHistory();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      await login(email, password);
      const url = location.state.redirectedFrom
        ? location.state.redirectedFrom.pathname
        : '/';
      history.replace(url);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleSignup(event) {
    try {
      await signUp(email, password);
      history.replace('/guestbook');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleSignup}>
          Sign up
        </button>
        <p>{error}</p>
      </form>
    </>
  );
}
