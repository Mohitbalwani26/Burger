import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NaigationItems/NavigationItems";
import DrawToggle from "../SideDrawer/DrawToggle/DrawToggle";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawToggle clicked={props.drawToggleclicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
