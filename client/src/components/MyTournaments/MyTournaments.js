import TournamentModal from "../TournamentModal";
import TournamentListFunc from "../TournamentListFunc";
//import UserStatsChart from "./UserStatsChart";
import UserStatsChart from "./UserStatsChart";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import store from "../../store";
import { loadUser } from "../../actions/authActions";

import { Container } from "reactstrap";

const MyTournaments = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <div className="MyTournaments">
      <Container>
        {/* <TournamentModal /> */}
        <TournamentListFunc />
        {/* <UserStatsChart /> */}
        <UserStatsChart />
      </Container>
    </div>
  );
};

export default MyTournaments;
