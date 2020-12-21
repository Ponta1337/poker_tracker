// import TournamentModal from "../TournamentModal";

import UserStatsChart from "../MyTournaments/UserStatsChart";
// import UserStatsChart from "./UserStatsChart";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { connect } from "react-redux";

import UserStats from "../MyTournaments/UserStats";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import { Container, Row, Col } from "reactstrap";
import { getUserStats } from "../../actions/userStatsActions";
import UserTournamentsList from "../UserTournamentsList";

function UserProfile(props) {
  useEffect(() => {
    props.getUserStats(userId);
  }, []);

  let { userId } = useParams();

  return (
    <div className="MyTournaments">
      <Container>
        <h3 style={{ textAlign: "center" }}></h3>
        <Row>
          <Col>
            <UserStats />
            <UserStatsChart />
          </Col>
          <Col>
            <UserTournamentsList id={userId} />
          </Col>
        </Row>
      </Container>
      )
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getUserStats })(UserProfile);
