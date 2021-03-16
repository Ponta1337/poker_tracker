import UserStatsChart from "../components/Stats/UserStatsChart";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserStats from "../components/Stats/UserStats";
import { Container, Row, Col, Spinner } from "reactstrap";
import { getUserStats, getDates } from "../actions/userStatsActions";
import ProfileTournamentList from "../components/ProfileTournamentList";
import "./AuthProfile.css";
import UserBanner from "../components/UserBanner";
function MyTournaments(props) {
  const { isAuthenticated } = props;
  const { getUserStats, getDates } = props;
  const { tournaments } = props.tournament;

  useEffect(() => {
    if (isAuthenticated) {
      getUserStats(props.auth.user._id);
      getDates(props.auth.user._id);
    }
  }, [isAuthenticated, tournaments]);

  return (
    <div className="MyTournaments">
      {!props.isAuthenticated &&
      !props.tournament.tournamentsByUserIdisLoaded &&
      !props.tournament.loading ? (
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      ) : (
        <div>
          <UserBanner />
          <Container>
            <Row>
              {props.tournament.tournaments.length === 0 ? (
                <h3>Add your first tournmanet!</h3>
              ) : (
                <Col sm={5}>
                  <UserStats />
                  <UserStatsChart />
                </Col>
              )}

              <Col sm={7}>
                <ProfileTournamentList />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tournament: state.tournament,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  userSats: state.userSats,
});

export default connect(mapStateToProps, { getUserStats, getDates })(
  MyTournaments
);
