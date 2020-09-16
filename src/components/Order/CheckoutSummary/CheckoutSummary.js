import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Hope you enjoy Delicious Burger</h1>
      <div style={{ width: "100%", margin: "auto" }}></div>
      <Burger ingredients={props.ingredients} />
      <Button btnType="Danger" clicked={props.checkout_cancel_handler}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkout_continue_handler}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
