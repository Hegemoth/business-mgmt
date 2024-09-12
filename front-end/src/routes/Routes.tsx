import { Route, Routes as Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import { AppRoute } from '../types/enums';

const Routes = () => (
  <Switch>
    <Route path={AppRoute.DASHBOARD} element={<Dashboard />} />
    <Route path={AppRoute.TEST} element={<Dashboard />} />
  </Switch>
);

export default Routes;
