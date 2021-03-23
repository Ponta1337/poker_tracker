import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Container, Spinner } from "reactstrap";

function UserStatsChart() {
  const { tournaments } = useSelector((state) => state.tournament);
  const { loading } = useSelector((state) => state.userStats);

  const [chartData, setChartData] = useState({});

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
          label: "Profit History SEK",
          fill: false,
          lineTension: 0.3,
          data: cashesArr,
          borderWidth: 3,
          borderColor: "#37a193",
        },
      ],
    });
  };

  useEffect(() => {
    chart();
    getCashes();
  }, [tournaments]);
  return (
    <Container className="mt-4" fluid="sm" style={{ padding: 0 }}>
      {loading ? (
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      ) : (
        <div
          style={{
            border: `1px solid rgba(0,0,0,.125)`,
            backgroundColor: "white",
          }}
        >
          <h5 className="red-header">Graph</h5>
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

export default UserStatsChart;
