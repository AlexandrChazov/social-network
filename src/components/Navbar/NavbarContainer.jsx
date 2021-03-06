import React from 'react';
import Navbar from "./Navbar";
import {connect} from "react-redux";

// const NavbarContainer = (props) => {
//   const friends = props.store.getState().sidebar
//   return (
//     <Navbar friends = { friends } />
//   )
// };

const mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends
  }
}

const NavbarContainer = connect(mapStateToProps)(Navbar)

export default NavbarContainer;
