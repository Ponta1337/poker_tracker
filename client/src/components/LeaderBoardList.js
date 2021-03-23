import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./LeaderBoardList.css";
import NumberFormat from "react-number-format";

import { ListGroup, ListGroupItem, Row, Col, Container } from "reactstrap";

import { getLeaderBoardStats } from "../actions/userStatsActions";
import { loadingSpinner } from "./LoadingSpinner";

function LeaderBoardList() {
  const { stats, loading } = useSelector((state) => state.userStats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaderBoardStats());
  }, []);

  return (
    <Container style={{ padding: 0 }}>
      <h5 className="red-header">Earnings (SEK)</h5>
      {!loading ? (
        <ListGroup className="lg-list" variant="flush">
          {stats.map(({ _id, totalEarnings }, index) => (
            <ListGroupItem action className="lg-items" key={index}>
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
                  <NumberFormat
                    //className="number-color"
                    value={totalEarnings}
                    displayType={"text"}
                    thousandSeparator={true}
                    // prefix={"SEK "}
                    format={totalEarnings > 999 ? "# #####" : "#####"}
                  />
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      ) : (
        loadingSpinner
      )}
    </Container>
  );
}

export default LeaderBoardList;
