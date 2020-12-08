import React, { useEffect, useState } from "react";
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
import TournamentModal from "./TournamentModal";
import TournamentModalFunc from "./TournamentModalFunc";

function TournamentListFunc(props) {
  const [editMode, setEditMode] = useState(false);
  const [editBtnText, setEditBtnText] = useState("Edit Your Tournaments");
  const [modal, setModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const { getTournamentsByUserId } = props;
  const { tournaments } = props.tournament;

  const [tournamentsByUserId, setTournamentsByUserId] = useState([]);

  useEffect(() => {
    // if (props.auth.isLoading === false) {
    //   getTournamentsByUserId(props.currentUser._id);
    // } else {
    //   console.log("loading user");
    getTournamentsByUserId(props.currentUser._id);
    // }
  }, []);

  //setTournamentsByUserId(tournaments);

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

  const newDateFormat = dateFormat(tournaments.date, "yyyy/m/d");
  console.log("JAAAAAA" + tournaments.date);

  const renderTournament = (tournament, index) => {
    return (
      <tr key={index}>
        {editMode ? (
          <td>
            <Button
              className="remove-btn"
              color="danger"
              size="sm"
              onClick={onClickSetIdAndToggle.bind(this, tournament._id)}
            >
              &times;
            </Button>
          </td>
        ) : null}

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
        <Col>
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
          <ButtonGroup aria-label="handle-tournaments">
            <Button
              onClick={onEditClick}
              color="dark"
              style={{ marginBottom: "2rem" }}
            >
              {editBtnText}
            </Button>
            {/* <TournamentModal /> */}
            <TournamentModalFunc />
          </ButtonGroup>

          {/* <ListGroup>
        <TransitionGroup className="tournament-list">
          {tournaments.map(({ _id, name, placement, cashedFor, userName }) => (
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

                {`${userName} Won $${cashedFor} for ${placement}th place in ${name} on ${newDateFormat}`}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup> */}
          {props.tournament.isEmpty === false &&
          props.tournament.tournamentsByUserIdisLoaded ? (
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
