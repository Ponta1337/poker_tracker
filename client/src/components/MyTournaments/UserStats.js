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
  // CardHeader,
  // CardTitle,
} from "reactstrap";

function UserStats(props) {
  const { tournaments } = props.tournament;
  const [userTournamentStats, setUserTournamentStats] = useState({
    totBuyInSum: 0,
    totCashSum: 0,
    totProfit: 0,
    numOfPlayedTournaments: 0,
    averageBuyInCost: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = () => {
    const buyInForArr = tournaments.map(({ buyInCost }) => buyInCost);
    const totalBuyInSum = buyInForArr.reduce((total, amount) => total + amount);

    const cashedForArr = tournaments.map(({ cashedFor }) => cashedFor);
    const totalCashSum = cashedForArr.reduce((total, amount) => total + amount);

    const numberOfTournamentsPlayed = tournaments.length;

    const avgBuyInCost = Math.round(totalBuyInSum / numberOfTournamentsPlayed);

    const totalProfit = totalCashSum - totalBuyInSum;

    // setUserTournamentStats({
    //   ...userTournamentStats,
    //   totBuyInSum: totalCashSum,
    //   totCashSum: cashedForArr.reduce((total, amount) => total + amount),
    //   totProfit: totalProfit,
    //   numOfPlayedTournaments: tournaments.length,
    //   averageBuyInCost: avgBuyInCost,
    // });
    setUserTournamentStats({
      ...userTournamentStats,
      totBuyInSum: buyInForArr.reduce((total, amount) => total + amount),
      totCashSum: 4000,
      totProfit: 70000,
      numOfPlayedTournaments: 20,
      averageBuyInCost: 300,
    });
  };

  return (
    <div>
      <Card className="text-center" style={{ width: "18rem" }}>
        <ListGroup variant="flush">
          <ListGroupItem>
            <CardText>Total Cashes</CardText> {userTournamentStats.totCashSum}
          </ListGroupItem>
          <ListGroupItem>
            Total buyins: {userTournamentStats.totBuyInSum}
          </ListGroupItem>
          <ListGroupItem>
            Total profit: {userTournamentStats.totProfit}
          </ListGroupItem>
          <ListGroupItem>
            Tournaments played: {userTournamentStats.numOfPlayedTournaments}
          </ListGroupItem>
          <ListGroupItem>
            Avg Buyin: {userTournamentStats.averageBuyInCost}
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
  // return (
  //   <div>
  //     <Card className="text-center" style={{ width: "18rem" }}>
  //       <ListGroup variant="flush">
  //         <ListGroupItem>
  //           <CardText>Total Cashes</CardText> {totalCashSum}
  //         </ListGroupItem>
  //         <ListGroupItem>Total buyins: {totalBuyInSum}</ListGroupItem>
  //         <ListGroupItem>Total profit: {totalProfit}</ListGroupItem>
  //         <ListGroupItem>
  //           Tournaments played: {numberOfTournamentsPlayed}
  //         </ListGroupItem>
  //         <ListGroupItem>Avg Buyin: {avgBuyInCost}</ListGroupItem>
  //       </ListGroup>
  //     </Card>
  //   </div>
  // );
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(UserStats);
