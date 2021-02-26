import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import { Container, Spinner } from "reactstrap";

function UserStatsChart(props) {
  const [chartData, setChartData] = useState({});
  const { tournaments } = props.tournament;

  const numArr = Array.from({ length: tournaments.length + 1 }, (_, i) => i);

  const cashedForArr = tournaments.map(
    ({ cashedFor, buyInCost }) => cashedFor - buyInCost
  );
  cashedForArr.push(0);
  cashedForArr.reverse();

  const cashesArr = [];

  const getCashes = () => {
    let ny = 0;
    for (let i = 0; i < cashedForArr.length; i++) {
      ny = ny += cashedForArr[i];
      cashesArr.push(ny);
    }
    return cashesArr;
  };

  const chart = () => {
    setChartData({
      labels: numArr,
      datasets: [
        {
          label: "Profit History",
          fill: false,
          lineTension: 0.5,
          data: cashesArr,
          borderWidth: 4,
        },
      ],
    });
  };

  useEffect(() => {
    chart();
    getCashes();
  }, [tournaments]);
  return (
    <Container style={{ paddingLeft: 0 }}>
      {props.userStats.loading ? (
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      ) : (
        <div
          style={{
            height: "250px",
            width: "500px",
            marginTop: "20px",
            backgroundColor: "white",
          }}
        >
          <Line
            data={chartData}
            options={{
              responsive: true,
            }}
          />
        </div>
      )}
    </Container>
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

export default connect(mapStateToProps, null)(UserStatsChart);
