import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Container, Table, Row, Spinner } from "reactstrap";

import { connect } from "react-redux";
import {
  deleteTournament,
  getTournamentsByUserName,
} from "../actions/tournamentActions";

function UserTournamentsList(props) {
  const { tournaments } = props.tournament;
  const { getTournamentsByUserName } = props;

  useEffect(() => {
    getTournamentsByUserName(props.name);
  }, [props.name]);

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
      {!props.tournament.loading ? (
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
      ) : (
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      )}
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => {
  const name = ownProps.uName;

  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
    name: name,
  };
};

export default connect(mapStateToProps, {
  getTournamentsByUserName,
  deleteTournament,
})(UserTournamentsList);
