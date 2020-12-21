import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input, Alert } from "reactstrap";
import { getPlayerByName } from "../actions/userStatsActions";
import { getUsers } from "../actions/userActions";

import { Link, Redirect, withRouter } from "react-router-dom";

function PlayerSearch(props) {
  const { userSearch } = props.userStats;
  const [searchPlayer, SetSearchPlayer] = useState("");
  const [userMatch, setUserMatch] = useState(false);
  const [nameToSubmit, setNameToSubmit] = useState("");
  const [id, setId] = useState(null);
  const [nameSubmited, setNameSubmited] = useState(false);

  useEffect(() => {}, []);
  // setTimeout(() => {
  //   props.history.push("/mytournaments");
  // }, 10000);
  // {tournaments.map(
  //   ({ _id, name, placement, cashedFor, userName, date, userId }) => (
  const goToUserProfile = () => {
    // props.users.map(({ name }) => {
    //   if (searchPlayer === name) {
    //     console.log("samma");
    //   } else {
    //     console.log("inte samma");
    //   }
    // });
    //if (!userMatch) alert("User doesn't exist =(");
    // if (searchPlayer === props.users) {
    //   console.log("input = state");
    // } else {
    //   console.log("inout != state.... :(");
    // }
  };

  const onChange = (e) => {
    SetSearchPlayer(e.target.value);
    //console.log(searchPlayer);
    // props.getUsers();
  };

  const onSubmitName = (e) => {
    e.preventDefault();
    // props.users.forEach((user) => {
    //   if (user.name === searchPlayer) {
    //     setId(user._id);
    //     setUserMatch(true);
    //   }
    // });
    setNameSubmited(true);
    props.history.push(`/user/${searchPlayer}`);
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
          placeholder="Search for player"
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
