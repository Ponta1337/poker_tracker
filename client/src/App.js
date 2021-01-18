import React, { useEffect } from "react";
import AppNavBar from "./components/AppNavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MyTournaments from "./components/MyTournaments/MyTournaments";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";

import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavBar />

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/myprofile" exact component={MyTournaments} />
            <Route path="/user/:userName" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
