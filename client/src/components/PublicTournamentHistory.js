import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import "./PublicTournamentHistory.css";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTournaments } from "../actions/tournamentActions";
import { Link } from "react-router-dom";
import moment from "moment";
import ordinal from "ordinal";

import { loadingSpinner } from "./LoadingSpinner";

function PublicTournamentHistory() {
  const { tournaments, loading } = useSelector((state) => state.tournament);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [isLoaded, SetIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getTournaments());
  }, []);

  const handleClick = () => {
    setPage(page + 1);
    SetIsLoaded(true);
  };

  return (
    <Container className="mt-4 mt-md-0" style={{ padding: 0 }}>
      <h5 className="red-header">Tournament History</h5>
      {!loading ? (
        <ListGroup className="tournament-lg">
          {tournaments
            .slice(0, 8 * page)
            .map(({ _id, name, placement, cashedFor, userName, date }) => (
              <ListGroupItem action className="history-items" key={_id}>
                <div>
                  <Link
                    style={{
                      color: "#b22022",
                    }}
                    to={`/user/${userName}`}
                  >
                    {userName}
                  </Link>
                  {" - "} <small>{moment(date).fromNow()}</small>
                </div>
                {` Won ${cashedFor} kr for ${ordinal(
                  placement
                )} place in ${name} on ${dateFormat(date, "yyyy/m/d")}`}
              </ListGroupItem>
            ))}
        </ListGroup>
      ) : (
        !isLoaded && loadingSpinner
      )}
      {tournaments.length < page * 8 ? null : (
        <Button block color="dark" onClick={handleClick}>
          Load More...
        </Button>
      )}
    </Container>
  );
}

export default PublicTournamentHistory;
