import { useSelector } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Col,
  Container,
  Spinner,
  Row,
} from "reactstrap";
import NumberFormat from "react-number-format";

function UserStats() {
  const { stats, loading } = useSelector((state) => state.userStats);

  return (
    <Container className="container-border" style={{ padding: 0 }}>
      <h5 className="red-header">Stats (SEK)</h5>
      {!loading ? (
        <ListGroup variant="flush">
          {stats.map(
            (
              {
                totalEarnings,
                cashedForSum,
                buyInCostSum,
                biggestCash,
                ROI,
                avgBuyIn,
              },
              index
            ) => (
              <Row key={index}>
                <Col>
                  <ListGroupItem>
                    Total Earnings:{" "}
                    <NumberFormat
                      value={totalEarnings}
                      displayType={"text"}
                      format={totalEarnings > 999 ? "# #####" : "#####"}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    Total buyins:{" "}
                    <NumberFormat
                      value={buyInCostSum}
                      displayType={"text"}
                      format={buyInCostSum > 999 ? "# #####" : "#####"}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    Total cashes:{" "}
                    <NumberFormat
                      value={cashedForSum}
                      displayType={"text"}
                      format={cashedForSum > 999 ? "# #####" : "#####"}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    Avg Buyin:{" "}
                    <NumberFormat
                      value={Math.round(avgBuyIn)}
                      displayType={"text"}
                      format={Math.round(avgBuyIn) > 999 ? "# #####" : "#####"}
                    />
                  </ListGroupItem>
                  <ListGroupItem>
                    Biggest Cash:{" "}
                    <NumberFormat
                      value={biggestCash}
                      displayType={"text"}
                      format={biggestCash > 999 ? "# #####" : "#####"}
                    />
                  </ListGroupItem>
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

export default UserStats;
