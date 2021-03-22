import React, { Fragment, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteTournament } from "../actions/tournamentActions";

function TournamentDeleteModal({ tournamentToDeleteId }) {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);

  const onDeleteClick = () => {
    setTimeout(() => {
      dispatch(deleteTournament(tournamentId));
    }, 1000);

    toggle();
  };

  const onClickSetIdAndToggle = () => {
    setTournamentId(tournamentToDeleteId);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <Button
        className="remove-btn"
        color="danger"
        size="sm"
        onClick={onClickSetIdAndToggle}
      >
        <i className="fas fa-trash-alt"></i>
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

export default TournamentDeleteModal;
