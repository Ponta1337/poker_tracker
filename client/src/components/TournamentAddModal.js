import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  Alert,
} from "reactstrap";

import { connect } from "react-redux";
import { addTournament } from "../actions/tournamentActions";
import PropTypes from "prop-types";

function TournamentModalFunc(props) {
  const [modal, setModal] = useState(false);
  const [onChangeValues, setOnChangeValues] = useState({
    userId: "",
    userName: "",
  });
  const [tournamentAdded, setTournamentAdded] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setOnChangeValues({
      ...onChangeValues,
      [e.target.name]: e.target.value,
      userId: props.auth.user._id,
      userName: props.auth.user.name,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newTournament = {
      name: onChangeValues.name,
      userId: onChangeValues.userId,
      userName: onChangeValues.userName,
      placement: onChangeValues.placement,
      cashedFor: onChangeValues.cashedFor,
      buyInCost: onChangeValues.buyInCost,
    };

    props.addTournament(newTournament);

    setTournamentAdded(true);

    setTimeout(() => {
      setTournamentAdded(false);
    }, 5000);

    toggle();
  };
  return (
    <div>
      {props.isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
          Add Tournament
        </Button>
      ) : null}

      {tournamentAdded ? (
        <Alert color="success">Tournament added!</Alert>
      ) : null}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a played tournament</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="tournament">Tournament</Label>
              <Input
                required="true"
                type="text"
                name="name"
                id="tournament"
                placeholder="Add Tournament"
                onChange={onChange}
              />
              <Label for="buyInCost">Buy-in</Label>
              <Input
                required="true"
                type="text"
                name="buyInCost"
                id="tournament"
                placeholder="Tournament cost"
                onChange={onChange}
              />
              <Label for="placement">Placement</Label>
              <Input
                required="true"
                type="text"
                name="placement"
                id="tournament"
                placeholder="Placement"
                onChange={onChange}
              />
              <Label for="cashedFor">Cashed</Label>
              <Input
                required="true"
                type="text"
                name="cashedFor"
                id="tournament"
                placeholder="How much did you cash for?"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add Tournament
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tournament: state.tournament,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { addTournament })(TournamentModalFunc);
