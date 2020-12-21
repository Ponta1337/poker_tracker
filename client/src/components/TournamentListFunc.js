import React, { useEffect } from "react";
import dateFormat from "dateformat";
import { Container, Col, Table, ButtonGroup, Row } from "reactstrap";

import { connect } from "react-redux";
import {
  deleteTournament,
  getTournamentsByUserId,
} from "../actions/tournamentActions";

import TournamentUpdateModal from "./TournamentUpdateModal";
import TournamentModalFunc from "./TournamentModalFunc";

import TournamentDeleteModal from "./TournamentDeleteModal";

function TournamentListFunc(props) {
  const { getTournamentsByUserId } = props;
  const { tournaments } = props.tournament;

  useEffect(() => {
    if (props.isAuthenticated) {
      getTournamentsByUserId(props.currentUser._id);
    }
  }, []);

  const renderTournament = (tournament, index) => {
    return (
      <tr key={index}>
        <td>{tournament.name}</td>
        <td>{tournament.buyInCost}</td>
        <td>{tournament.cashedFor}</td>
        <td>{tournament.placement}</td>
        <td>{dateFormat(tournament.date, "yyyy-m-d")}</td>
        <td>
          <TournamentDeleteModal
            tournamentToDeleteId={(this, tournament._id)}
          />
          <TournamentUpdateModal tourn={(this, tournament)} />
        </td>
      </tr>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <ButtonGroup aria-label="handle-tournaments">
            <TournamentModalFunc />
          </ButtonGroup>

          {
            props.tournament.tournaments.length !== 0 &&
            props.tournament.tournamentsByUserIdisLoaded ? (
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
            ) : null
            // <div>Your tournaments will appear here</div>
          }
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  getTournamentsByUserId,

  deleteTournament,
})(TournamentListFunc);
