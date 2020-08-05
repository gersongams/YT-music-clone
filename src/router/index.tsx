import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../containers/Header";
import PlayerPage from "../page/PlayerPage";

const AppRouter = () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/">
          <PlayerPage />
        </Route>
      </Switch>
    </>
  </Router>
);
export default AppRouter;
