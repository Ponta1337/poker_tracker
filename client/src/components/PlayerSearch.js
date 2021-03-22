import React, { useState } from "react";
import { Form, Input, InputGroup, Container } from "reactstrap";

import { useHistory } from "react-router-dom";

function PlayerSearch() {
  const [searchPlayer, SetSearchPlayer] = useState("");
  let history = useHistory();

  const onChange = (e) => {
    SetSearchPlayer(e.target.value);
  };

  const onSubmitName = (e) => {
    e.preventDefault();
    if (searchPlayer !== "") {
      history.push(`/user/${searchPlayer}`);
      SetSearchPlayer("");
    }
  };

  return (
    <Container className="mt-4 mt-md-0 " style={{ marginRight: "30px" }}>
      <Form onSubmit={onSubmitName}>
        <InputGroup>
          <Input
            type="search"
            name="search"
            id="exampleSearch"
            placeholder="Search for user"
            onChange={onChange}
            value={searchPlayer}
            required
          />
          <button
            onClick={onSubmitName}
            type="button"
            className="btn btn-primary"
          >
            <i className="fas fa-search"></i>
          </button>
        </InputGroup>
      </Form>
    </Container>
  );
}

export default PlayerSearch;
