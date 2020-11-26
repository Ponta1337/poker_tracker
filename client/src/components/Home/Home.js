import React, { useEffect } from "react";

import TournamentModal from "../TournamentModal";

import SharedStats from "../SharedStats";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import store from "../../store";
//import { loadUser } from "../../actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  // useEffect(() => {
  //   //   store.getState();
  // }, []);

  return (
    <div className="Home">
      <Container>
        <SharedStats />
      </Container>
    </div>
  );
};

export default Home;
