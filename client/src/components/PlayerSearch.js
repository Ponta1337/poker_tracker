import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Input } from "reactstrap";
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

    props.history.push(`/user/${searchPlayer}`);
    SetSearchPlayer("");
  };

  return (
    <div>
      {/* {userMatch && nameSubmited ? <Redirect to={`/user/${id}/`} /> : null} */}
      <Form onSubmit={onSubmitName}>
        <Input
          // onSubmit={onSubmit}
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="Search for user"
          onChange={onChange}
          value={searchPlayer}
        />
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
