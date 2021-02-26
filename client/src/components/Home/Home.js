import React from "react";
import LeaderBoardList from "../LeaderBoardList";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import PublicTournamentHistory from "../PublicTournamentHistory";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          {" "}
          <LeaderBoardList />
        </Col>
        <Col sm={6}>
          <PublicTournamentHistory />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
