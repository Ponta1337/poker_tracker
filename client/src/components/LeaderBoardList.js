import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Card,
  Row,
  Col,
  Spinner,
  CardTitle,
} from "reactstrap";

import { getLeaderBoardStats } from "../actions/userStatsActions";

function LeaderBoardList(props) {
  const { stats } = props.userStats;
  const { getLeaderBoardStats } = props;

  useEffect(() => {
    getLeaderBoardStats();
  }, []);

  return (
    <Fragment>
      {!props.userStats.loading ? (
        <Card className="text-left" style={{ width: "26rem", padding: 10 }}>
          <CardTitle style={{ textAlign: "center" }}>TOP EARNINGS</CardTitle>
          <ListGroup variant="flush">
            {stats.map(({ _id, totalEarnings }, index) => (
              <ListGroupItem
                key={_id}
                style={{ borderRight: "none", borderLeft: "none" }}
              >
                <Row>
                  <Col sm={2}>{index + 1}</Col>
                  <Col sm={4}>
                    <Link
                      style={{ color: "Crimson" }}
                      to={`/user/${_id.userName}`}
                    >
                      {_id.userName}
                    </Link>
                  </Col>
                  <Col sm={6} style={{ textAlign: "right" }}>
                    $ {totalEarnings}
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>
      ) : (
        <Spinner
          size="lg"
          animation="grow"
          color="dark"
          style={{ justifyContent: "center" }}
        />
      )}
    </Fragment>
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
