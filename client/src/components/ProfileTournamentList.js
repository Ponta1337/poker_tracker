import React, { useEffect } from "react";
import dateFormat from "dateformat";
import { Container, Col, Table, ButtonGroup, Row, Spinner } from "reactstrap";

import { connect } from "react-redux";
import {
  deleteTournament,
  getTournamentsByUserId,
  getTournamentsByUserName,
} from "../actions/tournamentActions";

import TournamentUpdateModal from "./TournamentUpdateModal";

import TournamentDeleteModal from "./TournamentDeleteModal";
import TournamentAddModal from "./TournamentAddModal";

function TournamentListFunc(props) {
  const { getTournamentsByUserId } = props;
  const { getTournamentsByUserName } = props;
  const { tournaments } = props.tournament;

  useEffect(() => {
    if (props.isAuthenticated) {
      getTournamentsByUserId(props.currentUser._id);
      //getTournamentsByUserName(props.currentUser.name);
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
    <Container style={{ marginLeft: 60 }}>
      {!props.tournament.loading ? (
        <Row>
          <Col>
            <ButtonGroup aria-label="handle-tournaments">
              <TournamentAddModal />
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{tournaments.map(renderTournament)}</tbody>
                </Table>
              ) : null
              // <div>Your tournaments will appear here</div>
            }
          </Col>
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
  getTournamentsByUserName,
  deleteTournament,
})(TournamentListFunc);
