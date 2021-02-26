import UserStatsChart from "../components/Stats/UserStatsChart";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { connect } from "react-redux";

import UserStats from "../components/Stats/UserStats";

import { BrowserRouter as Router, useParams } from "react-router-dom";

import { Container, Row, Col, Spinner } from "reactstrap";
import { getUserStats, getPlayerByName } from "../actions/userStatsActions";
import UserTournamentsList from "../components/UserTournamentsList";

function UserProfile(props) {
  const { getPlayerByName } = props;
  const { getUserStats } = props;

  useEffect(() => {
    getPlayerByName(userName);
  }, [useParams()]);

  useEffect(() => {
    if (userIdd.length !== 0) {
      getUserStats(userIdd);
    }
  }, [props.userStats.userSearch]);

  let { userName } = useParams();
  const userIdd = props.userStats.userSearch.map(({ _id }) => _id);

  return (
    <div className="MyTournaments">
      {props.userStats.searchLoading ? null : userIdd.length === 0 ? (
        <div
          style={{ textAlign: "center" }}
        >{`User "${userName}" doesn't exist =(`}</div>
      ) : (
        <Container>
          <Row>
            <Col>
              <h2 style={{ textAlign: "center" }}>{userName}</h2>
            </Col>
          </Row>
          <h3 style={{ textAlign: "center" }}></h3>
          <Row>
            <Col>
              <UserStats />
              <UserStatsChart />
            </Col>
            <Col>
              <UserTournamentsList pUserId={userIdd} />
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
