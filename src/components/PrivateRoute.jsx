import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const user = { email: '' };
  return (
    <Route {...rest}>
      {user.email ? (
        children
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { redirectedFrom: location } }}
        />
      )}
    </Route>
  );
}
