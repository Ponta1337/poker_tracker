import React, { useEffect } from "react";
import dateFormat from "dateformat";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getTournaments } from "../actions/tournamentActions";
import { getTournamentsByUserId } from "../actions/tournamentActions";
import { Link } from "react-router-dom";
import moment from "moment";
import LeaderBoardList from "./LeaderBoardList";

function SharedStats(props) {
  const { getTournaments } = props;

  // const moment1 = moment().startOf("day").fromNow();

  useEffect(() => {
    getTournaments();
  }, []);

  const { tournaments } = props.tournament;

  // const handleClick = (hej) => {
  //   // SetEttOrd(hej);
  //   alert(hej);
  //   //props.getTournamentsByUserId(hej);
  //   //<UserProfile ettOrd={ettOrd} />;
  // };

  return (
    <Container>
      <LeaderBoardList />
      Recent results!
      <ListGroup>
        <TransitionGroup className="tournament-list">
          {tournaments.map(
            ({ _id, name, placement, cashedFor, userName, date, userId }) => (
              // cashedFor > 0 && (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                {/* <NavItem> */}
                {/* <Link to={`/user/:${userId}`}> */}
                <ListGroupItem
                // action
                // tag="a"
                // onClick={handleClick.bind(this, userId)}
                // href="/userprofile"
                >
                  <div>
                    <Link to={`/user/${userId}`}>{userName}</Link> -{" "}
                    {moment(date).fromNow()}
                  </div>
                  {/* <Link to={`/user/${userId}`}>{userName}</Link> */}
                  {` won $${cashedFor} for ${placement}th place in ${name} on ${dateFormat(
                    date,
                    "yyyy/m/d"
                  )}`}
                </ListGroupItem>
                {/* </Link> */}
                {/* </NavItem> */}
              </CSSTransition>
            )
            // )
          )}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getTournaments,
  getTournamentsByUserId,
})(SharedStats);
