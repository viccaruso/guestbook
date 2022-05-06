import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Auth from './views/Auth';
import Guestbook from './views/Guestbook';

export default function App() {
  return (
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
  );
}
