import React, { useEffect } from "react";
import AppNavBar from "./components/AppNavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProfile from "./Views/AuthProfile";
import Home from "./Views/Home";
import UserProfile from "./Views/UserProfile";
import NoMatch from "./components/NoMatch";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";

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
            <Route path="/profile/:userName" exact component={AuthProfile} />
            <Route path="/user/:userName" component={UserProfile} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="*">
              {" "}
              <NoMatch />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
