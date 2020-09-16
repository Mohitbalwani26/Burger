import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkout_cancel = () => {
    this.props.history.goBack();
  };

  checkout_coninue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchased_redirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchased_redirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkout_cancel_handler={this.checkout_cancel}
            checkout_continue_handler={this.checkout_coninue}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const map_state_to_props = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalprice,
    purchased: state.order.purchased,
  };
};

export default connect(map_state_to_props)(Checkout);
