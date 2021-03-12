import React from "react";
import LeaderBoardList from "../components/LeaderBoardList";
import "./Home.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import PublicTournamentHistory from "../components/PublicTournamentHistory";

const Home = () => {
  return (
    <Container
      style={{
        // border: "solid 1px",
        //backgroundColor: "#fffe9",
        borderRadius: "5px",
      }}
      className="mt-5"
    >
      <Row>
        <Col sm={{ size: 4, offset: 0 }}>
          <LeaderBoardList />
        </Col>
        <Col sm={{ size: 6, offset: 2 }}>
          <PublicTournamentHistory />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
