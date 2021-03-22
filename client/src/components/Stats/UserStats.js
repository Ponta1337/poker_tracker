import { useSelector } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Col,
  Container,
  Spinner,
  Row,
} from "reactstrap";

function UserStats() {
  const { stats, loading } = useSelector((state) => state.userStats);

  return (
    <Container className="container-border" style={{ padding: 0 }}>
      <h5 className="red-header">Stats</h5>
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
                    Total Earnings: ${totalEarnings}
                  </ListGroupItem>
                  <ListGroupItem>Total buyins: ${buyInCostSum}</ListGroupItem>
                  <ListGroupItem>Total cashes: ${cashedForSum}</ListGroupItem>
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

export default UserStats;
