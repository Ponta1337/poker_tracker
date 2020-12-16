import React, { Fragment, useEffect, useState } from "react";
import dateFormat from "dateformat";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Container,
  ListGroup,
  ListGroupItem,
  Col,
  Table,
  ButtonGroup,
  Row,
} from "reactstrap";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import {
  deleteTournament,
  getTournamentsByUserId,
} from "../actions/tournamentActions";
import UserStats, { userTotalCashesSum } from "./MyTournaments/UserStats";
import TournamentUpdateModal from "./TournamentUpdateModal";
import TournamentModalFunc from "./TournamentModalFunc";

function UserTournamentsList(props) {
  const [editMode, setEditMode] = useState(false);
  const [editBtnText, setEditBtnText] = useState("Edit Your Tournaments");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const { getTournamentsByUserId } = props;
  const { tournaments } = props.tournament;

  const [tournamentsByUserId, setTournamentsByUserId] = useState([]);

  useEffect(() => {
    if (props.isAuthenticated) {
      getTournamentsByUserId(props.userId);
    }
  }, []);

  const renderTournament = (tournament, index) => {
    return (
      <tr key={index}>
        {/* kör en .map och TransitionGroup + CSSTransition */}
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
        {/* <UserStats /> */}
        {/* <Col>
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
          </Modal> */}
        {/* <ButtonGroup aria-label="handle-tournaments">
            <Button
              onClick={onEditClick}
              color="dark"
              style={{ marginBottom: "2rem" }}
            >
              {editBtnText}
            </Button>
            {/* <TournamentModal /> */}
        {/* <TournamentModalFunc /> */}

        {/* {editModal ? (
              <TournamentUpdateModal tournamentEdit={editTournament} />
            ) : null} */}
        {/* </ButtonGroup> */}

        {!props.tournament.isEmpty ? (
          <Table>
            <thead>
              <tr>
                {editMode ? <th></th> : null}
                <th>Tournament </th>
                <th>Buyin</th>
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
        ) : null}
        {/* </Col> */}
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
