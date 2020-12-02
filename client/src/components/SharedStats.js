import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
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
  //const newDateFormat = dateFormat(tournaments.date, "m/d/yyyy");

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="tournament-list">
          {tournaments.map(
            ({ _id, name, placement, cashedFor, userName, date }) =>
              cashedFor > 0 && (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    {`${userName} won $${cashedFor} for ${placement}th place in ${name} on ${dateFormat(
                      date,
                      "m/d/yyyy"
                    )}`}
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
