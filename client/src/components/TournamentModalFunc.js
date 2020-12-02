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

import { connect } from "react-redux";
import { addTournament } from "../actions/tournamentActions";
import PropTypes from "prop-types";

function TournamentModalFunc(props) {
  // state = {
  //   modal: false,
  // };
  const [modal, setModal] = useState(false);
  const [onChangeValues, setOnChangeValues] = useState({
    userId: "",
    userName: "",
    // target: { name: "", value: null },
  });

  // static propTypes = {
  //   isAuthenticated: PropTypes.bool,
  //   auth: PropTypes.object.isRequired,
  // };

  const toggle = () => {
    setModal(!modal);
  };

  // onChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value,
  //     userId: this.props.auth.user._id,
  //     userName: this.props.auth.user.name,
  //   });
  // };

  const onChange = (e) => {
    setOnChangeValues({
      ...onChangeValues,
      [e.target.name]: e.target.value,
      userId: props.auth.user._id,
      userName: props.auth.user.name,
    });
    console.log(onChangeValues);
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
    console.log("hej" + onChangeValues.name);
    console.log(onChangeValues);
    //Add tournament via addTournament action
    props.addTournament(newTournament);

    //Close modal
    toggle();
  };
  return (
    <div>
      {props.isAuthenticated ? (
        <Button color="dark" style={{ marginBottom: "2rem" }} onClick={toggle}>
          Add Tournament
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage tournaments </h4>
      )}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a tournament</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="tournament">Tournament</Label>
              <Input
                type="text"
                name="name"
                id="tournament"
                placeholder="Add Tournament"
                onChange={onChange}
              />
              <Label for="buyInCost">Buy-in</Label>
              <Input
                type="text"
                name="buyInCost"
                id="tournament"
                placeholder="Add tournament cost"
                onChange={onChange}
              />
              <Label for="placement">Placement</Label>
              <Input
                type="text"
                name="placement"
                id="tournament"
                placeholder="Add your placement"
                onChange={onChange}
              />
              <Label for="cashedFor">Cashed</Label>
              <Input
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
