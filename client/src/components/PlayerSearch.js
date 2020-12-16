import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Input } from "reactstrap";
import { getPlayerByName } from "../actions/userStatsActions";

function PlayerSearch(props) {
  // const { tournaments } = props.tournament;
  const { stats } = props.userStats;
  const { userSearch } = props.userStats;
  const [searchPlayer, SetSearchPlayer] = useState("");
  useEffect(() => {}, []);

  const onChange = (e) => {
    SetSearchPlayer(e.target.value);
    console.log(searchPlayer);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    props.getPlayerByName(searchPlayer);
    console.log(userSearch._id);
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Input
          onSubmit={onSubmit}
          type="search"
          name="search"
          id="exampleSearch"
          placeholder="Test"
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
  };
};

export default connect(mapStateToProps, { getPlayerByName })(PlayerSearch);
