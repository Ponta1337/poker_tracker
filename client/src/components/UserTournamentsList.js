import React, { Fragment, useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Container, Table, Spinner } from "reactstrap";

import { connect } from "react-redux";
import {
  deleteTournament,
  getTournamentsByUserId,
} from "../actions/tournamentActions";

function UserTournamentsList(props) {
  const { tournaments } = props.tournament;
  const { getTournamentsByUserId } = props;

  useEffect(() => {
    getTournamentsByUserId(props.userId);
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
      {!props.tournament.loading ? (
        <Container fluid="sm" className="mt-4 mt-md-0" style={{ padding: 0 }}>
          <h5 className="red-header">Recent tournaments</h5>
          {!props.tournament.isEmpty ? (
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
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      )}
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  const uId = ownProps.pUserId;

  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
    userId: uId,
  };
};

export default connect(mapStateToProps, {
  getTournamentsByUserId,
  deleteTournament,
})(UserTournamentsList);
