import React, { Fragment, useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Container, Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTournamentsByUserId } from "../actions/tournamentActions";
import { loadingSpinner } from "./LoadingSpinner";

function UserTournamentList({ userId }) {
  const { tournaments, loading, isEmpty } = useSelector(
    (state) => state.tournament
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTournamentsByUserId(userId));
  }, []);

  const renderTournament = (tournament, index) => {
    return (
      <tr key={index}>
        <td>{tournament.name}</td>
        <td>{tournament.buyInCost}</td>
        <td>{tournament.cashedFor}</td>
        <td>{tournament.placement}</td>
        <td>{dateFormat(tournament.date, "m/d/yyyy")}</td>
      </tr>
    );
  };

  return (
    <Fragment>
      {!loading ? (
        <Container fluid="sm" className="mt-4 mt-md-0" style={{ padding: 0 }}>
          <h5 className="red-header">Recent tournaments</h5>
          {!isEmpty ? (
            <Table responsive style={{ backgroundColor: "white" }}>
              <thead>
                <tr>
                  <th>Tournament </th>
                  <th>Buyin</th>
                  <th>Cash</th>
                  <th>Place</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>{tournaments.map(renderTournament)}</tbody>
            </Table>
          ) : null}
        </Container>
      ) : (
        loadingSpinner
      )}
    </Fragment>
  );
}

export default UserTournamentList;
