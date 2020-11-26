import React, { Component } from "react";
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

class TournamentModal extends Component {
  state = {
    modal: false,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      userId: this.props.auth.user._id,
      userName: this.props.auth.user.name,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newTournament = {
      name: this.state.name,
      userId: this.state.userId,
      userName: this.state.userName,
      placement: this.state.placement,
      cashedFor: this.state.cashedFor,
      buyInCost: this.state.buyInCost,
    };

    //Add tournament via addTournament action
    this.props.addTournament(newTournament);

    //Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Tournament
          </Button>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage tournaments </h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a tournament</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="tournament">Tournament</Label>
                <Input
                  type="text"
                  name="name"
                  id="tournament"
                  placeholder="Add Tournament"
                  onChange={this.onChange}
                />
                <Label for="buyInCost">Buy-in</Label>
                <Input
                  type="text"
                  name="buyInCost"
                  id="tournament"
                  placeholder="Add tournament cost"
                  onChange={this.onChange}
                />
                <Label for="placement">Placement</Label>
                <Input
                  type="text"
                  name="placement"
                  id="tournament"
                  placeholder="Add your placement"
                  onChange={this.onChange}
                />
                <Label for="cashedFor">Cashed</Label>
                <Input
                  type="text"
                  name="cashedFor"
                  id="tournament"
                  placeholder="How much did you cash for?"
                  onChange={this.onChange}
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
}

const mapStateToProps = (state) => ({
  tournament: state.tournament,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { addTournament })(TournamentModal);
