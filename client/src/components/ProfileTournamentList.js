import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Container, Col, Table, Row, Spinner } from "reactstrap";
import { loadingSpinner } from "./LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { getTournamentsByUserId } from "../actions/tournamentActions";
import TournamentUpdateModal from "./TournamentUpdateModal";
import TournamentDeleteModal from "./TournamentDeleteModal";
import TournamentAddModal from "./TournamentAddModal";
import "./ProfileTournamentList.css";

function ProfileTournamentList() {
  const { tournaments, loading, tournamentsByUserIdisLoaded } = useSelector(
    (state) => state.tournament
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isGreen, setIsGreen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getTournamentsByUserId(user._id));
    }
  }, []);

  if (isGreen) {
    setTimeout(() => {
      setIsGreen(false);
    }, 4000);
    console.log("greeeen");
  }
  const renderTournament = (tournament, index) => {
    return (
      <tr
        className={
          isGreen && index === 0
            ? "tournament-success tournament-row"
            : "tournament-row"
        }
        key={index}
      >
        <td>{tournament.name}</td>
        <td>{tournament.buyInCost}</td>
        <td>{tournament.cashedFor}</td>
        <td>{tournament.placement}</td>
        <td>{dateFormat(tournament.date, "yyyy-m-d")}</td>
        <td>
          <TournamentDeleteModal
            tournamentToDeleteId={(this, tournament._id)}
          />
          <TournamentUpdateModal tournamentToUpdate={(this, tournament)} />
        </td>
      </tr>
    );
  };

  return (
    <Container className="mt-4 mt-md-0" style={{ padding: 0 }}>
      <h5 className="red-header">Recent Tournaments</h5>
      {!loading ? (
        <Row>
          <Col>
            {tournaments.length !== 0 && tournamentsByUserIdisLoaded ? (
              <Table responsive style={{ backgroundColor: "white" }}>
                <thead>
                  <tr>
                    <th>Tournament </th>
                    <th>Buyin</th>
                    <th>Cash</th>
                    <th>Place</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {tournaments.map(renderTournament)}
                </tbody>
              </Table>
            ) : null}
          </Col>
        </Row>
      ) : (
        loadingSpinner
      )}
      <TournamentAddModal setIsGreen={() => setIsGreen(true)} />
    </Container>
  );
}

export default ProfileTournamentList;
