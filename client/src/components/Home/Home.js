import React, { useEffect } from "react";

import TournamentModal from "../TournamentModal";

import SharedStats from "../SharedStats";
//import { loadUser } from "../../actions/authActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";

const Home = () => {
  // useEffect(() => {
  //   //   store.getState();
  // }, []);

  return (
    <Container>
      <Row>
        <Col sm={4}>hej</Col>
        <Col sm={8}>
          <SharedStats />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
