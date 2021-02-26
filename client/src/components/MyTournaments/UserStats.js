import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Card, CardText, Spinner } from "reactstrap";
import { getUserStats } from "../../actions/userStatsActions";
// import { useEffect, useState } from "react";

function UserStats(props) {
  const { stats } = props.userStats;

  // useEffect(() => {
  //   props.getUserStats(props.userId);
  //   console.log("userid..." + props.userId);
  // }, []);

  return (
    <div>
      {!props.userStats.loading ? (
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
                  <CardText>Total Earnings</CardText> ${totalEarnings}
                </ListGroupItem>
                <ListGroupItem>Total buyins: ${buyInCostSum}</ListGroupItem>
                <ListGroupItem>Total cashes: ${cashedForSum}</ListGroupItem>
                {/* <ListGroupItem>Tournaments played: TBA</ListGroupItem> */}
                <ListGroupItem>
                  Avg Buyin: ${Math.round(avgBuyIn)}
                </ListGroupItem>
                <ListGroupItem>Biggest Cash: ${biggestCash}</ListGroupItem>
                <ListGroupItem>ROI: {Math.round(ROI)}%</ListGroupItem>
              </ListGroup>
            )
          )}
        </Card>
      ) : (
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      )}
    </div>
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
