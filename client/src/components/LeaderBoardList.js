import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./LeaderBoardList.css";

import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Spinner,
  Container,
} from "reactstrap";

import { getLeaderBoardStats } from "../actions/userStatsActions";

function LeaderBoardList(props) {
  const { stats } = props.userStats;
  const { getLeaderBoardStats } = props;

  useEffect(() => {
    getLeaderBoardStats();
  }, []);

  return (
    <Container>
      <h5 className="red-header">Earnings</h5>
      {!props.userStats.loading ? (
        <ListGroup className="lg-list" variant="flush">
          {stats.map(({ _id, totalEarnings }, index) => (
            <ListGroupItem className="lg-items" key={_id}>
              <Row>
                <Col sm={2}>{index + 1}</Col>
                <Col sm={5}>
                  <Link
                    style={{ color: "#b22022" }}
                    to={`/user/${_id.userName}`}
                  >
                    {_id.userName}
                  </Link>
                </Col>
                <Col sm={5} style={{ textAlign: "right" }}>
                  $ {totalEarnings}
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        // </Card>
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

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    currentUser: state.auth.user,
    userStats: state.userStats,
  };
};

export default connect(mapStateToProps, { getLeaderBoardStats })(
  LeaderBoardList
);
