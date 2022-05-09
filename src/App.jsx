import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import { UserProvider } from './context/UserContext';
import Auth from './views/Auth';
import Guestbook from './views/Guestbook';

export default function App() {
  return (
    <UserProvider>
      <Switch>
        <Route path="/login">
          <Auth />
        </Route>
        <PrivateRoute path="/guestbook">
          <Guestbook />
        </PrivateRoute>
        <Route path="/">
          <Redirect to="/guestbook" />
        </Route>
      </Switch>
    </UserProvider>
  );
}
