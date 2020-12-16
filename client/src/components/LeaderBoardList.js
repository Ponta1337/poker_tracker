import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  // Button,
  // Modal,
  // ModalBody,
  // ModalHeader,
  // Container,
  ListGroup,
  ListGroupItem,

  // Col,
  // Table,
  // ButtonGroup,
  // Row,
  Card,
  CardText,
} from "reactstrap";

//import { getUserStats } from "../../actions/userStatsActions";
import { getLeaderBoardStats } from "../actions/userStatsActions";

//import MyTournaments from "./MyTournaments";

function LeaderBoardList(props) {
  // const { tournaments } = props.tournament;
  const { stats } = props.userStats;
  const { tournaments } = props.tournament;

  useEffect(() => {
    props.getLeaderBoardStats();
  }, []);

  return (
    <div>
      <Card className="text-left" style={{ width: "18rem" }}>
        {stats.map(({ _id, totalEarnings }) => (
          <ListGroup variant="flush">
            <ListGroupItem>
              <Link to={`/user/${_id.userId}`}>{_id.userName}</Link>
              Total Earnings: {totalEarnings}
            </ListGroupItem>
          </ListGroup>
        ))}
      </Card>
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

export default connect(mapStateToProps, { getLeaderBoardStats })(
  LeaderBoardList
);
