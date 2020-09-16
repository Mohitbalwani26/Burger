import React, { Component } from "react";
import Auxilary from "../../hoc/Auxilary/Auxilary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as burgerBuilderactions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount = () => {
    this.props.on_init_ingredients();
  };

  update_purchase_state = (ingredients) => {
    let val = 0;
    for (let key in ingredients) {
      val += ingredients[key];
    }
    return val > 0;
  };

  purchase_handler = () => {
    this.setState({ purchasing: true });
  };

  purchase_cancel_handler = () => {
    this.setState({ purchasing: false });
  };

  purchase_continue_handler = () => {
    this.props.on_purchase_init();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledinfo = {
      ...this.props.ings,
    };
    for (let key in disabledinfo) {
      disabledinfo[key] = disabledinfo[key] <= 0;
    }

    let ordersummary = null;

    let burger = this.props.error ? (
      <p>Ingredients were not loaded. sorry!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Auxilary>
          <Burger ingredients={this.props.ings} />
          <div>
            <BuildControls
              ingredient_Added={this.props.on_ingredient_added}
              ingredient_removed={this.props.on_ingredient_removed}
              disabled={disabledinfo}
              price={this.props.price}
              purchasable={this.update_purchase_state(this.props.ings)}
              ordered={this.purchase_handler}
            />
          </div>
        </Auxilary>
      );
      ordersummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchase_cancel={this.purchase_cancel_handler}
          purchase_continue={this.purchase_continue_handler}
          price={this.props.price.toFixed(2)}
        />
      );
    }

    return (
      <Auxilary>
        <Modal
          show={this.state.purchasing}
          ModalClosed={this.purchase_cancel_handler}
        >
          {ordersummary}
        </Modal>
        {burger}
      </Auxilary>
    );
  }
}

const map_state_to_props = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalprice,
    error: state.burgerBuilder.error,
  };
};

const map_dispatch_to_props = (dispatch) => {
  return {
    on_ingredient_added: (ing_name) =>
      dispatch(burgerBuilderactions.addIngredient(ing_name)),
    on_ingredient_removed: (ing_name) =>
      dispatch(burgerBuilderactions.removeIngredient(ing_name)),
    on_init_ingredients: () => dispatch(burgerBuilderactions.initIngridients()),
    on_purchase_init: () => dispatch(burgerBuilderactions.purchase_init()),
  };
};

export default connect(
  map_state_to_props,
  map_dispatch_to_props
)(withErrorHandler(BurgerBuilder, axios));
