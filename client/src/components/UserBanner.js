import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./UserBanner.css";
import { useSelector } from "react-redux";
import moment from "moment";

function UserBanner() {
  const { dates } = useSelector((state) => state.userStats);
  let { userName } = useParams();

  return (
    <div className="banner">
      {dates === null ? null : (
        <Container>
          <Row>
            <Col>
              <h3>{userName}</h3>
            </Col>
            <Col>
              <h5>Joined</h5>
              <p>{moment(dates.register_date).format("MMM Do, YYYY")}</p>
            </Col>
            <Col>
              <h5>Last visited</h5>
              <p>{moment(dates.last_visited_date).fromNow()}</p>
            </Col>
            <Col>
              <h5>Profile views</h5>
              <p>{dates.profile_views}</p>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default UserBanner;
