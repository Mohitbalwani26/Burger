import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    <NavigationItem link="/orders">order</NavigationItem>
  </ul>
);
export default navigationItems;
