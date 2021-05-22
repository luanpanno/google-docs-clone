import { Redirect, Route, Switch } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Home } from '../pages/Home';

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={`/documents/${uuid()}`} />
      </Route>

      <Route exact path="/documents/:id" component={Home} />

      <Redirect to="/" />
    </Switch>
  );
};
