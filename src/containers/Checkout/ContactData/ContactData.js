import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayvalue: "Fastest" },
            { value: "cheapest", displayvalue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    form_is_valid: false,
  };

  check_validity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  order_handler = (event) => {
    event.preventDefault();
    const form_data = {};
    for (let key in this.state.orderForm) {
      form_data[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: form_data,
    };
    this.props.on_order_burger(order);
    // alert("Under construction");
  };
  input_handler = (event, inputIndentifier) => {
    const updated_order_form = {
      ...this.state.orderForm,
    };
    const updated_form_element = {
      ...updated_order_form[inputIndentifier],
    };
    updated_form_element.value = event.target.value;
    updated_form_element.valid = this.check_validity(
      updated_form_element.value,
      updated_form_element.validation
    );
    let form_is_valid = true;
    updated_form_element.touched = true;
    updated_order_form[inputIndentifier] = updated_form_element;
    for (let key in updated_order_form) {
      form_is_valid = updated_order_form[key].valid && form_is_valid;
    }
    this.setState({
      orderForm: updated_order_form,
      form_is_valid: form_is_valid,
    });
  };
  render() {
    const form_elements_array = [];
    for (let key in this.state.orderForm) {
      form_elements_array.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.order_handler}>
        {/* <Input elementType="" elementConfig="" value="" /> */}
        {form_elements_array.map((form_element) => {
          return (
            <Input
              key={form_element.id}
              elementType={form_element.config.elementType}
              elementConfig={form_element.config.elementConfig}
              value={form_element.config.value}
              invalid={!form_element.config.valid}
              touched={form_element.config.touched}
              should_validate={form_element.config.validation}
              changed={(event) => this.input_handler(event, form_element.id)}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.form_is_valid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter you Contact Data</h4>
        {form}
      </div>
    );
  }
}

const map_state_to_props = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalprice,
    loading: state.order.loading,
  };
};

const map_dispatch_to_props = (dispatch) => {
  return {
    on_order_burger: (orderData) =>
      dispatch(actions.purchase_burger_start(orderData)),
  };
};

export default connect(
  map_state_to_props,
  map_dispatch_to_props
)(withErrorHandler(ContactData, axios));
