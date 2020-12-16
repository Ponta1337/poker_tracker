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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { connect } from "react-redux";
import { editTournament } from "../actions/tournamentActions";
import PropTypes from "prop-types";

function TestFuncAsProps(props) {
  const [modal, setModal] = useState(true);
  const [onChangeValues, setOnChangeValues] = useState({
    // name: props.tournament.name,
  });

  const [editModal, setEditModal] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const { tournaments } = props.tournament;
  const [editTournament, setEditTournament] = useState(null);

  const onCLickEdit = () => {
    setEditTournament(props.hej);
    console.log(editTournament);
    console.log(props.test + " wutt");
  };

  return (
    <div>
      {/* <p>test: {props.lol}</p> */}
      {/* <p>turrar{tournaments}</p> */}
      {/* <Button onClick={onCLickEdit}>HELLO</Button> */}
      {/* <Button onClick={() => alert(props.wutt)}>HELLO</Button> */}
      {/* <Button onClick={() => alert("HEEEOOOOOO" + props.hej)}>HELLO</Button> */}
      {/* {console.log(props.hej)} */}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const tjaba = ownProps.hej;

  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    test: tjaba,
  };
};

export default connect(mapStateToProps, { editTournament })(TestFuncAsProps);
