// import TournamentModal from "../TournamentModal";

import UserStatsChart from "../MyTournaments/UserStatsChart";
// import UserStatsChart from "./UserStatsChart";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import UserStats from "../MyTournaments/UserStats";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";

import { Container, Row, Col, Spinner } from "reactstrap";
import { getUserStats, getPlayerByName } from "../../actions/userStatsActions";
import UserTournamentsList from "../UserTournamentsList";

function UserProfile(props) {
  const [searchUserId, setSearchUserId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    props.getUserStats(userName);
  }, [useParams()]);

  let { userName } = useParams();

  const uId = props.userStats.stats.map(({ _id }) => _id);

  return (
    <div className="MyTournaments">
      {props.userStats.loading ? null : uId.length === 0 ? (
        <div
          style={{ textAlign: "center" }}
        >{`User "${userName}" doesn't exist =(`}</div>
      ) : (
        <Container>
          <h3 style={{ textAlign: "center" }}></h3>
          <Row>
            <Col>
              <UserStats />
              <UserStatsChart />
            </Col>
            <Col>
              <UserTournamentsList uName={userName} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    userStats: state.userStats,
  };
};

export default connect(mapStateToProps, { getUserStats, getPlayerByName })(
  UserProfile
);
