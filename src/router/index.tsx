import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import HomePage from '@/pages/home';
import LoginPage from '@/pages/login';
import DocPage from '@/pages/doc';
import PublicPage from '@/pages/publicComponents';
import CustomPage from '@/pages/testPlugin';
import LocalePage from '@/pages/locales';
import IconPage from '@/pages/icon';
import TableList from '@/pages/table';
import TableEdit from '@/pages/table/edit';
import TableDrag from '@/pages/table/drag';
import PrivateRoute from './components/privateRouter';
import AuthPage from '@/pages/auth';

const RouterPage = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path={'/login'} component={LoginPage} />
        <Route
          path="/"
          render={() => (
            <HomePage>
              <Switch>
                <PrivateRoute path="/doc" component={DocPage} />
                <PrivateRoute path="/home" component={PublicPage} />
                <PrivateRoute path="/custom" component={CustomPage} />
                <PrivateRoute path="/locale" component={LocalePage} />
                <PrivateRoute path="/icon" component={IconPage} />
                <PrivateRoute path="/table/base" component={TableList} />
                <PrivateRoute path="/table/edit" component={TableEdit} />
                <PrivateRoute path="/table/drag" component={TableDrag} />
                <PrivateRoute path="/auth" component={AuthPage} />
                <Redirect to="/home" />
              </Switch>
            </HomePage>
          )}
        />
      </Switch>
    </HashRouter>
  );
};
export default RouterPage;
