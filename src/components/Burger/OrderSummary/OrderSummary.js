import React, { Component } from "react";
import Auxilary from "../../../hoc/Auxilary/Auxilary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate = () => {
    console.log("updting");
  };
  render() {
    const summaryIngredient = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: "capitalize" }}>{igkey}</span>:{" "}
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );
    return (
      <Auxilary>
        <h3>Your Order</h3>
        <p>A Delicious Burger with following ingredients: </p>
        <ul>{summaryIngredient}</ul>
        <p>
          <strong>Total cost: {this.props.price}</strong>
        </p>
        <Button clicked={this.props.purchase_cancel} btnType="Danger">
          CANCEL
        </Button>
        <Button clicked={this.props.purchase_continue} btnType="Success">
          CONTINUE
        </Button>
      </Auxilary>
    );
  }
}

export default OrderSummary;
