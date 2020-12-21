import TournamentListFunc from "../TournamentListFunc";
import UserStatsChart from "./UserStatsChart";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import UserStats from "./UserStats";
import { Container, Row, Col } from "reactstrap";
import { getUserStats } from "../../actions/userStatsActions";

function MyTournaments(props) {
  const { isAuthenticated } = props;
  const { getUserStats } = props;
  const { tournaments } = props.tournament;

  useEffect(() => {
    if (isAuthenticated) {
      getUserStats(props.auth.user._id);
    }
  }, [isAuthenticated, tournaments]);

  return (
    <div className="MyTournaments">
      {!props.isAuthenticated &&
      !props.tournament.tournamentsByUserIdisLoaded &&
      !props.tournament.loading ? (
        <div>
          <p>Loading.....</p>
        </div>
      ) : (
        <Container>
          <Row>
            <Col sm={5}>
              {/* <TestFuncAsProps /> */}
              <UserStats />
              <UserStatsChart />
            </Col>
            <Col sm={7}>
              <TournamentListFunc />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tournament: state.tournament,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserStats })(MyTournaments);
