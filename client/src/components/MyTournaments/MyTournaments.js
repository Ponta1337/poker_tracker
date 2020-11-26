import React, { useState, useRef, useEffect } from "react";

import TournamentModal from "../TournamentModal";
import TournamentListFunc from "../TournamentListFunc";

import { Container } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const MyTournaments = () => {
  return (
    // <Provider store={store}>
    <div className="MyTournaments">
      <Container>
        <TournamentModal />
        <TournamentListFunc />
        {/* <TournamentList /> */}
      </Container>
    </div>
    //</Provider>
  );
};

export default MyTournaments;
