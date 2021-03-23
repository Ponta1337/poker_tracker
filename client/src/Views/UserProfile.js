import UserStatsChart from "../components/Stats/UserStatsChart";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserStats from "../components/Stats/UserStats";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import {
  getUserStats,
  getPlayerByName,
  getDates,
  updateLastVisited,
} from "../actions/userStatsActions";
import UserTournamentList from "../components/UserTournamentList";
import UserBanner from "../components/UserBanner";

function UserProfile() {
  const dispatch = useDispatch();
  const { userSearch, searchLoading } = useSelector((state) => state.userStats);

  let { userName } = useParams();

  useEffect(() => {
    dispatch(getPlayerByName(userName));
    dispatch(updateLastVisited(uId));
  }, [userName, dispatch]);

  useEffect(() => {
    if (uId.length !== 0) {
      dispatch(getUserStats(uId));
      dispatch(getDates(uId));
    }
  }, [userSearch, dispatch]);

  const uId = userSearch.map(({ _id }) => _id);

  return (
    <div>
      {searchLoading ? null : uId.length === 0 ? (
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
                <UserTournamentList userId={uId} />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
