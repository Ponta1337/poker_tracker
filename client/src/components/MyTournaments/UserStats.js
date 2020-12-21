import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Card, CardText } from "reactstrap";
import { getUserStats } from "../../actions/userStatsActions";

function UserStats(props) {
  const { stats } = props.userStats;

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
              <ListGroupItem>Total buyins: ${buyInCostSum}</ListGroupItem>
              <ListGroupItem>Total cashes: ${cashedForSum}</ListGroupItem>
              {/* <ListGroupItem>Tournaments played: TBA</ListGroupItem> */}
              <ListGroupItem>Avg Buyin: ${Math.round(avgBuyIn)}</ListGroupItem>
              <ListGroupItem>Biggest Cash: ${biggestCash}</ListGroupItem>
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
