import UserStatsChart from "../components/Stats/UserStatsChart";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import UserStats from "../components/Stats/UserStats";
import { BrowserRouter as Router, useParams } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";
import {
  getUserStats,
  getPlayerByName,
  getDates,
  updateLastVisited,
} from "../actions/userStatsActions";
import UserTournamentsList from "../components/UserTournamentsList";
import UserBanner from "../components/UserBanner";

function UserProfile(props) {
  const { getPlayerByName, getUserStats, getDates, updateLastVisited } = props;
  let params = useParams();
  useEffect(() => {
    getPlayerByName(userName);
    updateLastVisited(userIdd);
  }, [params]);

  useEffect(() => {
    if (userIdd.length !== 0) {
      getUserStats(userIdd);
      getDates(userIdd);
    }
  }, [props.userStats.userSearch]);

  let { userName } = useParams();
  const userIdd = props.userStats.userSearch.map(({ _id }) => _id);

  return (
    <div>
      {props.userStats.searchLoading ? null : userIdd.length === 0 ? (
        <Container>
          <div
            style={{
              textAlign: "center",
              marginBottom: "550px",
              padding: "50px",
            }}
          >{`User "${userName}" doesn't exist =(`}</div>
        </Container>
      ) : (
        <div>
          <UserBanner />
          <Container>
            <Row>
              <Col sm={6}>
                <UserStats />
                <UserStatsChart />
              </Col>
              <Col sm={6}>
                <UserTournamentsList pUserId={userIdd} />
              </Col>
            </Row>
          </Container>
        </div>
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

export default connect(mapStateToProps, {
  getUserStats,
  getPlayerByName,
  getDates,
  updateLastVisited,
})(UserProfile);
