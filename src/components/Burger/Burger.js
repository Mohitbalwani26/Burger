import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  // basically if dic contains a:2 then key will have a0,a1..
  let temp = Object.keys(props.ingredients)
    .map((ky) => {
      return [...Array(props.ingredients[ky])].map((_, i) => {
        return <BurgerIngredient key={ky + i} type={ky} />;
      });
    })
    .reduce((arr, ele) => {
      return arr.concat(ele);
    }, []);
  //
  if (temp.length === 0) {
    temp = <p>Please add some ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {temp}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
