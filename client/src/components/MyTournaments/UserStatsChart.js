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
    console.log(cashesArr);
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
          // backgroundColor: "rgba(75,192,192,1)",
          // borderColor: "rgba(0,0,0,1)",
          data: cashesArr,

          //backgroundColor: ["green"],
          borderWidth: 4,
        },
      ],
    });
  };

  //const foreachArr = array.forEach((t) => t);
  useEffect(() => {
    chart();
    getCashes();
  }, [tournaments]);
  return (
    <Container>
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
            marginTop: "40px",
            backgroundColor: "white",
          }}
        >
          <Line
            data={chartData}
            options={{
              responsive: true,
            }}
          />
          {console.log(cashedForArr)}
          {console.log(cashesArr)}
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
