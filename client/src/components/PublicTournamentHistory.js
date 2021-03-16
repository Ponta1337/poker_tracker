import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import "./PublicTournamentHistory.css";
import {
  Container,
  ListGroup,
  ListGroupItem,
  Spinner,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { getTournaments } from "../actions/tournamentActions";
import { getTournamentsByUserId } from "../actions/tournamentActions";
import { Link } from "react-router-dom";
import moment from "moment";
import ordinal from "ordinal";
import { getUsers } from "../actions/userActions";

function PublicTournamentHistory(props) {
  const { getTournaments } = props;
  const [page, setPage] = useState(1);
  const { tournaments } = props.tournament;
  const [isLoaded, SetIsLoaded] = useState(false);

  useEffect(() => {
    getTournaments();
  }, []);

  const handleClick = () => {
    setPage(page + 1);
    SetIsLoaded(true);
  };

  return (
    <Container className="mt-4 mt-md-0" style={{ padding: 0 }}>
      <h5 className="red-header">Tournament History</h5>
      {!props.tournament.loading ? (
        <ListGroup className="tournament-lg">
          {/* <TransitionGroup className="tournament-list"> */}

          {tournaments
            .slice(0, 8 * page)
            .map(({ _id, name, placement, cashedFor, userName, date }) => (
              // (cashedFor > 0 ? : null)
              // <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem action className="history-items" key={_id}>
                <div>
                  <Link
                    style={{
                      color: "#b22022",
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
              // </CSSTransition>
            ))}
          {/* </TransitionGroup> */}
        </ListGroup>
      ) : (
        !isLoaded && (
          <Spinner
            size="lg"
            animation="grow"
            color="dark"
            style={{ justifyContent: "center" }}
          />
        )
      )}
      {tournaments.length < page * 8 ? null : (
        <Button
          // style={{ color: "black", backgroundColor: "white", border: "none" }}
          //className="btn-dark"
          block
          color="dark"
          onClick={handleClick}
        >
          Load More...
        </Button>
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
})(PublicTournamentHistory);
