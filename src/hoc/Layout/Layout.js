import React, { Component } from "react";
import Auxilary from "../Auxilary/Auxilary";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawer_closed_handler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawer_toggle_handler = () => {
    this.setState((prevstate) => {
      return { showSideDrawer: !prevstate.showSideDrawer };
    });
  };
  render() {
    return (
      <Auxilary>
        <Toolbar drawToggleclicked={this.sideDrawer_toggle_handler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawer_closed_handler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Auxilary>
    );
  }
}

export default Layout;
