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
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { addTournament } from "../actions/tournamentActions";

const options = [
  { tName: "After Work", buyin: 198 },
  { tName: "Tvåhundringen", buyin: 220 },
  { tName: "Skalpen", buyin: 220 },
  { tName: "LillLördag", buyin: 440 },
  { tName: "FredagsFighten", buyin: 660 },
  { tName: "SöndagsSteken", buyin: 810 },
];

function TournamentAddModal({ setIsGreen }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [onChangeValues, setOnChangeValues] = useState({
    userId: "",
    userName: "",
  });

  const toggle = () => {
    setModal(!modal);
  };

  const handleSelect = (e) => {
    options.forEach((t) => {
      if (t.tName === e.target.value) {
        setOnChangeValues({
          buyInCost: t.buyin,
          name: t.tName,
        });
      }
    });
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

    setIsGreen(true);
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

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a played tournament</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="tournament">Tournament</Label>
              <select
                className="custom-select"
                required={true}
                type="select"
                id="tournament"
                onChange={(e) => handleSelect(e)}
              >
                <option value="" disabled selected hidden>
                  Tournament name
                </option>

                {options.map(({ tName }, index) => (
                  <option key={index}>{tName}</option>
                ))}
              </select>

              <Label for="buyInCost">Buyin</Label>
              <Input
                required={true}
                type="number"
                name="buyInCost"
                id="tournament"
                placeholder="Tournament cost"
                //  onChange={onChange}
                disabled
                value={onChangeValues.buyInCost}
              />
              <Label for="placement">Placement</Label>
              <Input
                required={true}
                type="number"
                name="placement"
                id="tournament"
                placeholder="Placement"
                onChange={onChange}
              />
              <Label for="cashedFor">Cashed</Label>
              <Input
                required={true}
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
