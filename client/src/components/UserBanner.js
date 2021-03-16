import React from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./UserBanner.css";
import { connect } from "react-redux";
import moment from "moment";

function UserBanner(props) {
  let { userName } = useParams();

  return (
    <div className="banner">
      {props.userStats.dates === null ? null : (
        <Container>
          <Row>
            <Col>
              <h3>{userName}</h3>
            </Col>
            <Col>
              <h5>Joined</h5>
              <p>
                {moment(props.userStats.dates.register_date).format(
                  "MMM Do, YYYY"
                )}
              </p>
            </Col>
            <Col>
              <h5>Last visited</h5>
              <p>{moment(props.userStats.dates.last_visited_date).fromNow()}</p>
            </Col>
            <Col>
              <h5>Profile views</h5>
              <p>{props.userStats.dates.profile_views}</p>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userStats: state.userStats,
  };
};

export default connect(mapStateToProps, null)(UserBanner);
