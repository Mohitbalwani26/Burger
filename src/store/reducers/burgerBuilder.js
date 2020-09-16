import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalprice: 4,
  error: false,
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 0.7,
  meat: 1.6,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient_name]:
            state.ingredients[action.ingredient_name] + 1,
        },
        totalprice:
          state.totalprice + INGREDIENTS_PRICES[action.ingredient_name],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient_name]:
            state.ingredients[action.ingredient_name] - 1,
        },
        totalprice:
          state.totalprice - INGREDIENTS_PRICES[action.ingredient_name],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalprice: 4,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
