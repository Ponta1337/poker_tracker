import React from "react";
import SharedStats from "../SharedStats";
import LeaderBoardList from "../LeaderBoardList";
import PlayerSearchTest from "../PlayerSearchTest";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          {" "}
          <LeaderBoardList />
        </Col>
        <Col sm={6}>
          <SharedStats />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
