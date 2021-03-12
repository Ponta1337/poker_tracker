import { connect } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Col,
  Container,
  Spinner,
  Row,
} from "reactstrap";
import { getUserStats } from "../../actions/userStatsActions";
// import { useEffect, useState } from "react";

function UserStats(props) {
  const { stats } = props.userStats;

  return (
    <Container className="container-border" style={{ padding: 0 }}>
      <h5 className="red-header">Stats</h5>
      {!props.userStats.loading ? (
        // <Card className="text-center">
        <ListGroup variant="flush">
          {stats.map(
            ({
              totalEarnings,
              cashedForSum,
              buyInCostSum,
              biggestCash,
              ROI,
              avgBuyIn,
            }) => (
              <Row>
                <Col>
                  <ListGroupItem>
                    Total Earnings: ${totalEarnings}
                  </ListGroupItem>
                  <ListGroupItem>Total buyins: ${buyInCostSum}</ListGroupItem>
                  <ListGroupItem>Total cashes: ${cashedForSum}</ListGroupItem>
                  {/* <ListGroupItem>Tournaments played: TBA</ListGroupItem> */}
                  <ListGroupItem>
                    Avg Buyin: ${Math.round(avgBuyIn)}
                  </ListGroupItem>
                  <ListGroupItem>Biggest Cash: ${biggestCash}</ListGroupItem>
                  <ListGroupItem>ROI: {Math.round(ROI)}%</ListGroupItem>
                </Col>
              </Row>
            )
          )}
        </ListGroup>
      ) : (
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      )}
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => {
  // const uId = ownProps.pUserId;

  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
    userStats: state.userStats,
    // userId: uId,
  };
};

export default connect(mapStateToProps, { getUserStats })(UserStats);
