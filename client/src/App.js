import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import UserForm from "./components/UserForm";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute ";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/create" component={UserForm} />
        <PrivateRoute exact path="/edit/:id" component={UserForm} />
        <PrivateRoute exact path="/view/:id" component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
