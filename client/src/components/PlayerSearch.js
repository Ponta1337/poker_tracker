import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Input, InputGroup } from "reactstrap";
import { getPlayerByName } from "../actions/userStatsActions";
import { getUsers } from "../actions/userActions";

import { withRouter } from "react-router-dom";

function PlayerSearch(props) {
  const [searchPlayer, SetSearchPlayer] = useState("");

  const onChange = (e) => {
    SetSearchPlayer(e.target.value);
  };

  const onSubmitName = (e) => {
    e.preventDefault();
    if (searchPlayer !== "") {
      props.history.push(`/user/${searchPlayer}`);
      SetSearchPlayer("");
    }
  };

  return (
    <div>
      <Form onSubmit={onSubmitName}>
        <InputGroup onSubmit={onSubmitName}>
          {/* {userMatch && nameSubmited ? <Redirect to={`/user/${id}/`} /> : null} */}
          {/* <Form onSubmit={onSubmitName}> */}
          <Input
            // onSubmit={onSubmitName}
            type="search"
            name="search"
            id="exampleSearch"
            placeholder="Search for user"
            onChange={onChange}
            value={searchPlayer}
            required
          />
          <button
            onClick={onSubmitName}
            type="button"
            className="btn btn-primary"
          >
            <i className="fas fa-search"></i>
          </button>
          {/* </Form> */}
        </InputGroup>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
    userStats: state.userStats,
    users: state.user.users,
    history: state.history,
  };
};

export default connect(mapStateToProps, {
  getPlayerByName,
  getUsers,
})(withRouter(PlayerSearch));
