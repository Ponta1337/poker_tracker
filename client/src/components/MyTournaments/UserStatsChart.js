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

  // const test = [];
  // const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  // const jahapp = () => {
  //   let ny = 0;
  //   for (let i = 0; i < numbers.length; i++) {
  //     ny = ny += numbers[i];
  //     test.push(ny);
  //   }
  //   return test;
  // };

  const chart = () => {
    setChartData({
      labels: numArr,
      // labels: numberOfTournamentsPlayed,
      datasets: [
        {
          label: "Profit History",
          // data: [32, 45, 12, 23, 69],
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
    // console.log(numArr);
    // console.log(cashedForArr);
    jahapp();
    console.log("numArr " + numArr);
    console.log("cashedForArr " + cashedForArr);
    console.log("reversedCashedForArr " + reversedCashedForArr);
    console.log("cashesData " + cashesData);
    console.log("test " + test);
    // console.log(Array.from([1, 2, 3, 4, 5], (x) => x + [x]));
  }, [tournaments]);
  return (
    <div style={{ height: "500px", width: "500px" }}>
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
