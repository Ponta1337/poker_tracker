import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "reactstrap";

function LoginSuccessAlert() {
  const { loginSuccess, user } = useSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false);
    }, 10000);
  }, []);

  return loginSuccess && showAlert ? (
    <Alert style={{ textAlign: "center" }} color="success">
      {`Login successful! Welcome ${user.name}`}
    </Alert>
  ) : null;
}

export default LoginSuccessAlert;
