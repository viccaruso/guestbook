import { Redirect, Route, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

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
