import React, { Fragment, useState } from "react";
import dateFormat from "dateformat";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { connect } from "react-redux";
import { editTournament } from "../actions/tournamentActions";
import PropTypes from "prop-types";

function TournamentUpdateModal(props) {
  const [modal, setModal] = useState(false);
  const [onChangeValues, setOnChangeValues] = useState({});

  const toggle = () => {
    setModal(!modal);
  };

  const onClickEditTournamentTest = () => {
    setOnChangeValues({
      ...onChangeValues,

      name: props.tournamentToEdit.name,
      buyInCost: props.tournamentToEdit.buyInCost,
      cashedFor: props.tournamentToEdit.cashedFor,
      date: props.tournamentToEdit.date,
      placement: props.tournamentToEdit.placement,
    });

    toggle();
  };

  const onChange = (e) => {
    setOnChangeValues({
      ...onChangeValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const editedTournament = {
      _id: props.tournamentToEdit._id,
      name: onChangeValues.name,
      placement: onChangeValues.placement,
      cashedFor: onChangeValues.cashedFor,
      buyInCost: onChangeValues.buyInCost,
      date: onChangeValues.date,
    };
    //Edit tournament via editTournament action

    props.editTournament(editedTournament);

    //Close modal
    toggle();
  };
  return (
    <Fragment>
      {/* <div> */}
      <Button
        className="edit-btn"
        color="primary"
        size="sm"
        onClick={onClickEditTournamentTest}
      >
        edit
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit a tournament </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="tournament">Tournament</Label>
              <Input
                type="text"
                name="name"
                id="tournament"
                placeholder="Tournament name"
                onChange={onChange}
                defaultValue={onChangeValues.name}
              />
              <Label for="placement">Placement</Label>
              <Input
                type="text"
                name="placement"
                id="tournament"
                placeholder="Edit your placement"
                defaultValue={onChangeValues.placement}
                onChange={onChange}
              />
              <Label for="buyInCost">Buy-in</Label>
              <InputGroup>
                {/* <InputGroupAddon addonType="prepend">
                  <InputGroupText>SEK</InputGroupText>
                </InputGroupAddon> */}
                <Input
                  type="text"
                  name="buyInCost"
                  id="tournament"
                  placeholder="Edit tournament cost"
                  onChange={onChange}
                  defaultValue={onChangeValues.buyInCost}
                />
              </InputGroup>

              <Label for="cashedFor">Cashed</Label>
              <InputGroup>
                {/* <InputGroupAddon addonType="prepend">
                  <InputGroupText>SEK</InputGroupText>
                </InputGroupAddon> */}
                <Input
                  type="text"
                  name="cashedFor"
                  id="tournament"
                  placeholder="How much did you cash for?"
                  onChange={onChange}
                  defaultValue={onChangeValues.cashedFor}
                />
              </InputGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                name="date"
                id="date"
                defaultValue={dateFormat(onChangeValues.date, "yyyy-mm-dd")}
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Edit Tournament
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  const tournamentToEditState = ownProps.tourn;

  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    tournamentToEdit: tournamentToEditState,
  };
};

export default connect(mapStateToProps, { editTournament })(
  TournamentUpdateModal
);
