import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Container,
  ListGroup,
  ListGroupItem,
  Table,
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  getTournaments,
  deleteTournament,
  getTournamentsByUserId,
} from "../actions/tournamentActions";

function TournamentListFunc(props) {
  const [editMode, setEditMode] = useState(false);
  const [editBtnText, setEditBtnText] = useState("Edit Your Tournaments");
  const [modal, setModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const { getTournamentsByUserId } = props;
  const { tournaments } = props.tournament;

  useEffect(() => {
    getTournamentsByUserId(props.currentUser._id);
  }, []);

  const onDeleteClick = () => {
    props.deleteTournament(tournamentId);
    toggle();
  };
  const onEditClick = () => {
    setEditMode(!editMode);

    if (editBtnText === "Stop Editing") {
      setEditBtnText("Edit Your Tournaments");
    } else {
      setEditBtnText("Stop Editing");
    }
  };

  const onClickSetIdAndToggle = (id) => {
    setTournamentId(id);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const renderTournament = (tournament, index) => {
    return (
      <tr key={index}>
        {editMode ? (
          <td>
            <Button
              className="remove-btn"
              color="danger"
              size="sm"
              // onClick={onClickSetIdAndToggle.bind(this, _id)}
            >
              Remove &times;
            </Button>
          </td>
        ) : null}
        <td>{tournament.name}</td>
        <td>{tournament.userName}</td>
        <td>{tournament.cashedFor}</td>
        <td>{tournament.placement}</td>
        <td>{tournament.date}</td>
      </tr>
    );
  };

  return (
    <Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Are you sure you want to delete this tournament?
        </ModalHeader>
        <ModalBody>
          <Button
            onClick={onDeleteClick}
            color="dark"
            style={{ marginTop: "2rem" }}
            block
          >
            Yes
          </Button>
          <Button
            onClick={toggle}
            color="dark"
            style={{ marginTop: "2rem" }}
            block
          >
            No
          </Button>
        </ModalBody>
      </Modal>

      <Button
        onClick={onEditClick}
        color="primary"
        style={{ marginBottom: "2rem" }}
      >
        {editBtnText}
      </Button>
      <ListGroup>
        <TransitionGroup className="tournament-list">
          {tournaments.map(
            ({ _id, name, placement, cashedFor, userName, date }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {props.isAuthenticated && editMode ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={onClickSetIdAndToggle.bind(this, _id)}
                    >
                      Remove &times;
                    </Button>
                  ) : null}

                  {`${userName} Won $${cashedFor} for ${placement}th place in ${name} on ${date}`}
                </ListGroupItem>
              </CSSTransition>
            )
          )}
        </TransitionGroup>
      </ListGroup>
      <Table>
        <thead>
          <tr>
            {editMode ? <th></th> : null}
            <th>Tournament</th>
            <th>Username</th>
            <th>Cash</th>
            <th>Placement</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* {editMode ? <td>YES</td> : null} */}
          {tournaments.map(renderTournament)}
        </tbody>
      </Table>
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
  getTournaments,
  getTournamentsByUserId,
  deleteTournament,
})(TournamentListFunc);
