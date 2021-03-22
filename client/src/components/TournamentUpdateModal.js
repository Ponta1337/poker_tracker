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
} from "reactstrap";

import { useDispatch } from "react-redux";
import { editTournament } from "../actions/tournamentActions";

function TournamentUpdateModal({ tournamentToUpdate }) {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [onChangeValues, setOnChangeValues] = useState({});

  const toggle = () => {
    setModal(!modal);
  };

  const onClickEditTournamentTest = () => {
    setOnChangeValues({
      ...onChangeValues,

      name: tournamentToUpdate.name,
      buyInCost: tournamentToUpdate.buyInCost,
      cashedFor: tournamentToUpdate.cashedFor,
      date: tournamentToUpdate.date,
      placement: tournamentToUpdate.placement,
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
      _id: tournamentToUpdate._id,
      name: onChangeValues.name,
      placement: onChangeValues.placement,
      cashedFor: onChangeValues.cashedFor,
      buyInCost: onChangeValues.buyInCost,
      date: onChangeValues.date,
    };
    //Edit tournament via editTournament action

    dispatch(editTournament(editedTournament));

    //Close modal
    toggle();
  };
  return (
    <Fragment>
      <Button
        className="edit-btn"
        color="primary"
        size="sm"
        onClick={onClickEditTournamentTest}
      >
        <i className="fas fa-edit"></i>
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
              <Label for="buyInCost">Buyin</Label>
              <InputGroup>
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

export default TournamentUpdateModal;
