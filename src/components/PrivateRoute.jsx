import React from 'react';

export default function PrivateRoute({ children, ...rest }) {
  return <Route {...rest}>{children}</Route>;
}
