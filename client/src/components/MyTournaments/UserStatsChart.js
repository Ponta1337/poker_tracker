import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";

function UserStatsChart(props) {
  const [chartData, setChartData] = useState({});
  const [cashesData, setCashesData] = useState([]);
  const { tournaments } = props.tournament;

  const numArr = Array.from({ length: tournaments.length }, (_, i) => i + 1);

  const cashedForArr = tournaments.map(
    ({ cashedFor, buyInCost }) => cashedFor - buyInCost
  );
  const reversedCashedForArr = cashedForArr.reverse();

  const test = [];

  const jahapp = () => {
    let ny = 0;
    for (let i = 0; i < cashedForArr.length; i++) {
      ny = ny += cashedForArr[i];
      test.push(ny);
    }
    setCashesData(test);
    return test;
  };

  const chart = () => {
    setChartData({
      labels: numArr,
      // labels: numberOfTournamentsPlayed,
      datasets: [
        {
          label: "Profit History",
          data: test,
          //   backgroundColor: ["green"],
          borderWidth: 4,
        },
      ],
    });
  };

  // 2+ 1
  //

  //const foreachArr = array.forEach((t) => t);
  useEffect(() => {
    chart();
    jahapp();
  }, [tournaments]);
  return (
    <div style={{ height: "500px", width: "500px", marginTop: "40px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
        }}
      />
    </div>
  );
}

// export default UserStatsChart;

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(UserStatsChart);
