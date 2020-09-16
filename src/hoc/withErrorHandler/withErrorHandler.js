import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxilary from "../Auxilary/Auxilary";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount = () => {
      this.reqinterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resinterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    };
    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.reqinterceptor);
      axios.interceptors.response.eject(this.resinterceptor);
    };
    error_confirmed = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxilary>
          <Modal show={this.state.error} ModalClosed={this.error_confirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxilary>
      );
    }
  };
};

export default withErrorHandler;
