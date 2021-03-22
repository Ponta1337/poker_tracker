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

import { useSelector, useDispatch } from "react-redux";
import { addTournament } from "../actions/tournamentActions";

function TournamentAddModal() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

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
      userId: user._id,
      userName: user.name,
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

    dispatch(addTournament(newTournament));

    setTournamentAdded(true);

    setTimeout(() => {
      setTournamentAdded(false);
    }, 5000);

    toggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="primary"
          style={{ marginBottom: "2rem" }}
          onClick={toggle}
          block
        >
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
              <Label for="buyInCost">Buyin</Label>
              <Input
                required="true"
                type="number"
                name="buyInCost"
                id="tournament"
                placeholder="Tournament cost"
                onChange={onChange}
              />
              <Label for="placement">Placement</Label>
              <Input
                required="true"
                type="number"
                name="placement"
                id="tournament"
                placeholder="Placement"
                onChange={onChange}
              />
              <Label for="cashedFor">Cashed</Label>
              <Input
                required="true"
                type="number"
                name="cashedFor"
                id="tournament"
                placeholder="How much did you cash for?"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Add tournament
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TournamentAddModal;
