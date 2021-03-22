import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  ModalHeader,
  NavLink,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { withRouter } from "react-router-dom";

class DemoUserLogin extends Component {
  state = {
    modal: false,
    email: "demouser@gmail.com",
    password: "demouser",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  toggle = () => {
    //Clear erorrs
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    //Attempt to login
    this.props.login(user);
    this.props.history.push(`/profile/DemoUser`);
  };

  render() {
    return (
      <div>
        <div>
          <NavLink onClick={this.toggle} href="#">
            Login as guest
          </NavLink>

          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Login</ModalHeader>
            <ModalBody>
              <Form>
                <p>Would you like to explore with an existing demo user?</p>
                <Button onClick={this.onSubmit} block color="dark">
                  Yes
                </Button>

                <Button onClick={this.toggle} block color="dark">
                  No
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(
  withRouter(DemoUserLogin)
);
