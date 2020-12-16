import React, { Fragment, useEffect, useState } from "react";

import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";

import { connect } from "react-redux";
import {
  deleteTournament,
  getTournamentsByUserId,
} from "../actions/tournamentActions";

function TournamentDeleteModal(props) {
  const [modal, setModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  // const { getTournamentsByUserId } = props;
  // const { tournaments } = props.tournament;
  // const [editTournament, setEditTournament] = useState(null);

  // const [tournamentsByUserId, setTournamentsByUserId] = useState([]);

  const onDeleteClick = () => {
    props.deleteTournament(tournamentId);
    toggle();
  };

  const onClickSetIdAndToggle = () => {
    setTournamentId(props.tournamentToDeleteId);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  // const editModalToggle = () => {
  //   setEditModal(!editModal);
  // };
  // const onClickEditTournament = (tournament) => {
  //   setEditTournament(tournament);
  //   editModalToggle();
  // };

  return (
    <Fragment>
      <Button
        className="remove-btn"
        color="danger"
        size="sm"
        onClick={onClickSetIdAndToggle}
      >
        &times;
      </Button>

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
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  const tournamentToDeleteStateId = ownProps.tournamentToDeleteId;
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
    tournamentToDeleteId: tournamentToDeleteStateId,
  };
};

export default connect(mapStateToProps, {
  getTournamentsByUserId,
  deleteTournament,
})(TournamentDeleteModal);
