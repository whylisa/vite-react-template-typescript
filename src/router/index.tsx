import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import PublicPage from "../pages/publicComponents";
import CustomPage from "../pages/customHooks";
import LocalePage from "../pages/locales";
import IconPage from "../pages/icon";
import DocPage from "../pages/doc";

const RouterPage = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path={"/login"} component={LoginPage} />
        <Route
          path="/"
          render={() => (
            <HomePage>
              <Switch>
                <Route path="/doc" component={DocPage} />
                <Route path="/home" component={PublicPage} />
                <Route path="/custom" component={CustomPage} />
                <Route path="/locale" component={LocalePage} />
                <Route path="/icon" component={IconPage} />
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
