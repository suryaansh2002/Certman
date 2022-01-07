import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import routes from "./Config/routes";
import { AuthProvider } from "./Context";
import AppRoute from "./Components/AppRoute";
import ForgotPassword from "./Pages/Forgot/ForgotPassword";
import ResetPassword from "./Pages/Forgot/ResetPassword";
import Verify from "./Pages/Verify/verify";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/forgot" exact>
              <ForgotPassword />
            </Route>
            <Route path="/reset/:id/:token" exact>
              <ResetPassword />
            </Route>
            <Route path="/verify/:id" exact>
              <Verify />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {routes.map((route) => {
              return (
                <AppRoute
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  isPrivate={route.isPrivate}
                />
              );
            })}
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
