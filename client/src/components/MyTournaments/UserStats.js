import { useState, useEffect } from "react";
import { connect } from "react-redux";
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

import { getUserStats } from "../../actions/userStatsActions";
import MyTournaments from "./MyTournaments";

function UserStats(props) {
  // const { tournaments } = props.tournament;
  const { stats } = props.userStats;
  const { tournaments } = props.tournament;

  useEffect(() => {}, []);

  return (
    <div>
      <Card className="text-center" style={{ width: "18rem" }}>
        {stats.map(
          ({
            totalEarnings,
            cashedForSum,
            buyInCostSum,
            biggestCash,
            ROI,
            avgBuyIn,
          }) => (
            <ListGroup variant="flush">
              <ListGroupItem>
                <CardText>Total Earnings</CardText> {totalEarnings}
              </ListGroupItem>
              <ListGroupItem>Total buyins: {buyInCostSum}</ListGroupItem>
              <ListGroupItem>Total cashes: {cashedForSum}</ListGroupItem>
              <ListGroupItem>Tournaments played: TBA</ListGroupItem>
              <ListGroupItem>Avg Buyin: {Math.round(avgBuyIn)}</ListGroupItem>
              <ListGroupItem>Biggest Cash: {biggestCash}</ListGroupItem>
              <ListGroupItem>ROI: {Math.round(ROI)}%</ListGroupItem>
            </ListGroup>
          )
        )}
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

export default connect(mapStateToProps, { getUserStats })(UserStats);
