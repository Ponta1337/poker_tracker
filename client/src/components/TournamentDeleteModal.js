import React, { Fragment, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useDispatch } from "react-redux";
import { deleteTournament } from "../actions/tournamentActions";
import "./TournamentDeleteModal.css";

function TournamentDeleteModal({ tournamentToDeleteId }) {
  const dispatch = useDispatch();
  const [targetTr, setTargetTr] = useState("");

  const [modal, setModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);

  const onDeleteClick = () => {
    targetTr.className = "tournament-row deleted";
    setTimeout(() => {
      dispatch(deleteTournament(tournamentId));
      targetTr.className = "tournament-row";
    }, 2000);

    toggle();
  };

  const onClickSetIdAndToggle = (e) => {
    setTournamentId(tournamentToDeleteId);
    setTargetTr(e.target.parentElement.parentElement);
    // deleteTarget.className = "tournament-row deleted";
    // console.log(e.target);
    //target.classList.add("mystyle");
    //console.log(target);
    // console.log(e.target.parentElement);
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
        onClick={(e) => onClickSetIdAndToggle(e)}
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
