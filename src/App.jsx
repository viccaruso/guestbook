import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Auth from './views/Auth';
import Guestbook from './views/Guestbook';

export default function App() {
  return (
    <Switch>
      <Route path="/login">
        <Auth />
      </Route>
      <Route path="/guestbook">
        <Guestbook />
      </Route>
      <Route path="/">
        <Redirect to="/guestbook" />
      </Route>
    </Switch>
  );
}
