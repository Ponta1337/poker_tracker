import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Container, Table, Row } from "reactstrap";

import { connect } from "react-redux";
import {
  deleteTournament,
  getTournamentsByUserId,
} from "../actions/tournamentActions";

function UserTournamentsList(props) {
  const { getTournamentsByUserId } = props;
  const { tournaments } = props.tournament;

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
    <Container>
      <Row>
        {!props.tournament.isEmpty ? (
          <Table style={{ backgroundColor: "white" }}>
            <thead>
              <tr>
                <th>Tournament </th>
                <th>Buyin</th>
                <th>Cash</th>
                <th>Placement</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{tournaments.map(renderTournament)}</tbody>
          </Table>
        ) : null}
      </Row>
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id;

  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
    userId: id,
  };
};

export default connect(mapStateToProps, {
  getTournamentsByUserId,
  deleteTournament,
})(UserTournamentsList);
