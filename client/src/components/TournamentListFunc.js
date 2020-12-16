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
import TournamentUpdateModal from "./TournamentUpdateModal";
import TournamentModalFunc from "./TournamentModalFunc";
import TestFuncAsProps from "./TestFuncAsProps";
import TournamentDeleteModal from "./TournamentDeleteModal";

function TournamentListFunc(props) {
  const [editMode, setEditMode] = useState(false);
  const [editBtnText, setEditBtnText] = useState("Edit Your Tournaments");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const { getTournamentsByUserId } = props;
  const { tournaments } = props.tournament;
  const [editTournament, setEditTournament] = useState(null);

  const [tournamentsByUserId, setTournamentsByUserId] = useState([]);

  useEffect(() => {
    if (props.isAuthenticated) {
      getTournamentsByUserId(props.currentUser._id);
    }
  }, []);

  const onDeleteClick = () => {
    props.deleteTournament(tournamentId);
    toggle();
  };

  const onClickSetIdAndToggle = (id) => {
    setTournamentId(id);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const editModalToggle = () => {
    setEditModal(!editModal);
  };
  const onClickEditTournament = (tournament) => {
    setEditTournament(tournament);
    editModalToggle();
  };

  const renderTournament = (tournament, index) => {
    return (
      <tr key={index}>
        {/* {editMode ? ( */}

        {/* ) : null} */}
        {console.log(tournament)}
        {/* kör en .map och TransitionGroup + CSSTransition */}
        <td>{tournament.name}</td>
        <td>{tournament.buyInCost}</td>
        <td>{tournament.cashedFor}</td>
        <td>{tournament.placement}</td>
        <td>{dateFormat(tournament.date, "yyyy-m-d")}</td>

        <td>
          {/* <Button
            className="remove-btn"
            color="danger"
            size="sm"
            onClick={onClickSetIdAndToggle.bind(this, tournament._id)}
          >
            &times;
          </Button> */}
          <TournamentDeleteModal
            tournamentToDeleteId={(this, tournament._id)}
          />
          {/* <Button
            className="edit-btn"
            color="primary"
            size="sm"
            onClick={onClickEditTournament.bind(this, tournament)}
          >
            edit
          </Button> */}

          <TournamentUpdateModal tourn={(this, tournament)} />
        </td>
      </tr>
    );
  };

  return (
    <Container>
      {/* {console.log("tournaments: " + tournaments)} */}
      <Row>
        {/* <UserStats /> */}
        <Col>
          <ButtonGroup aria-label="handle-tournaments">
            <TournamentModalFunc />
          </ButtonGroup>

          {props.tournament.tournaments.length !== 0 &&
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
          ) : (
            <div>Your tournaments will appear here</div>
          )}
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
