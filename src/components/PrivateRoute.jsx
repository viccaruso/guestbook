import { Redirect, Route, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const { user } = useUser();

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
