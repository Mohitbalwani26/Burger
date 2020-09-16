import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";

export const purchase_burger_success = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id: id,
    orderData: orderData,
  };
};

export const purchase_burger_fail = (error) => {
  return { type: actionTypes.PURCHASE_BURGER_FAIL, error: error };
};

export const purchase_burger_loading = () => {
  return { type: actionTypes.PURCHASE_BURGER_LOADING };
};

export const purchase_burger_start = (orderData) => {
  return (dispatch) => {
    dispatch(purchase_burger_loading());
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response);
        dispatch(purchase_burger_success(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchase_burger_fail(error));
      });
  };
};

export const purchase_init = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
