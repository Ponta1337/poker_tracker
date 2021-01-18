import React, { useEffect } from "react";
import dateFormat from "dateformat";
import { Container, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getTournaments } from "../actions/tournamentActions";
import { getTournamentsByUserId } from "../actions/tournamentActions";
import { Link } from "react-router-dom";
import moment from "moment";
import ordinal from "ordinal";
import { getUsers } from "../actions/userActions";

function SharedStats(props) {
  const { getTournaments } = props;

  useEffect(() => {
    getTournaments();
    // props.getUsers();
  }, []);

  const { tournaments } = props.tournament;

  return (
    <Container>
      {!props.tournament.loading ? (
        <ListGroup>
          <TransitionGroup className="tournament-list">
            {tournaments.map(
              ({ _id, name, placement, cashedFor, userName, date, userId }) => (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <div>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "Crimson",
                        }}
                        to={`/user/${userName}`}
                      >
                        {userName}
                      </Link>{" "}
                      - <small>{moment(date).fromNow()}</small>
                    </div>
                    {` Won $${cashedFor} for ${ordinal(
                      placement
                    )} place in ${name} on ${dateFormat(date, "yyyy/m/d")}`}
                  </ListGroupItem>
                </CSSTransition>
              )
            )}
          </TransitionGroup>
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
  getUsers,
})(SharedStats);
