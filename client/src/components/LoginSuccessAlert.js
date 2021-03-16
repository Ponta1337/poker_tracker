import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

function LoginSuccessAlert(props) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 10000);
  }, []);

  return props.auth.loginSuccess && showAlert ? (
    <Alert style={{ textAlign: "center" }} color="success">
      {`Login successful! Welcome ${props.auth.user.name}`}
    </Alert>
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, null)(LoginSuccessAlert);
