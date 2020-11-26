import React, { useEffect, useState } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getTournaments } from "../actions/tournamentActions";

function SharedStats(props) {
  const { getTournaments } = props;

  useEffect(() => {
    getTournaments();
  }, []);

  const { tournaments } = props.tournament;
  return (
    <Container>
      {/* {console.log({ dateString })} */}
      <ListGroup>
        <TransitionGroup className="tournament-list">
          {tournaments.map(
            ({ _id, name, placement, cashedFor, userName, date }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {cashedFor > 0 &&
                    `${userName} Won $${cashedFor} for ${placement}th place in ${name} on ${date}`}
                  {/* Tournament name: {name} <br /> Placed: {placement} <br /> Cash:
                {cashedFor} <br /> */}
                  {/* {`${userName} Won $${cashedFor} for ${placement}th place in ${name} on ${date}`} */}
                </ListGroupItem>
              </CSSTransition>
            )
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
})(SharedStats);
