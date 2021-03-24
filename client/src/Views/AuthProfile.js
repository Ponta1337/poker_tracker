import UserStatsChart from "../components/Stats/UserStatsChart";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserStats from "../components/Stats/UserStats";
import { Container, Row, Col } from "reactstrap";
import { getUserStats, getDates } from "../actions/userStatsActions";
import ProfileTournamentList from "../components/ProfileTournamentList";
import "./AuthProfile.css";
import UserBanner from "../components/UserBanner";
import { loadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

function AuthProfile() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { tournaments, tournamentsByUserIdisLoaded, loading } = useSelector(
    (state) => state.tournament
  );

  const [isAuth, setIsAuth] = useState(false);
  const [showNoAuth, setShowNoAuth] = useState(false);
  const { userName } = useParams();

  useEffect(() => {
    if (isAuthenticated && userName === user.name) {
      dispatch(getUserStats(user._id));
      dispatch(getDates(user._id));
      setIsAuth(true);
      setShowNoAuth(true);
    }
  }, [isAuthenticated, tournaments, userName, dispatch]);

  return (
    <div>
      {isAuth ? (
        <div className="tournaments-container">
          {!isAuthenticated && !tournamentsByUserIdisLoaded && !loading ? (
            loadingSpinner
          ) : (
            <div>
              <UserBanner />
              {tournaments.length === 0 ? (
                <div className="new-user-container">
                  <h3>Add your first tournament!</h3>
                  <ProfileTournamentList />
                </div>
              ) : (
                <Container>
                  <Row>
                    <Col sm={5}>
                      <UserStats />
                      <UserStatsChart />
                    </Col>

                    <Col sm={7}>
                      <ProfileTournamentList />
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
          )}
        </div>
      ) : !isAuth && showNoAuth ? (
        <div className="unautharized-container">401 Unautharized</div>
      ) : null}
    </div>
  );
}

export default AuthProfile;
