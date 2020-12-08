import TournamentModal from "../TournamentModal";
import TournamentListFunc from "../TournamentListFunc";
//import UserStatsChart from "./UserStatsChart";
import UserStatsChart from "./UserStatsChart";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { connect } from "react-redux";
import UserStats from "./UserStats";

import store from "../../store";
import { loadUser } from "../../actions/authActions";

import { Container } from "reactstrap";
import { setUserStats } from "../../actions/tournamentActions";

function MyTournaments(props) {
  useEffect(() => {
    props.setUserStats();
  }, []);
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
          {/* <TournamentModal /> */}
          <TournamentListFunc />
          <UserStats />
          <UserStatsChart />
          {/* <UserStatsChart /> */}
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

export default connect(mapStateToProps, { setUserStats })(MyTournaments);
