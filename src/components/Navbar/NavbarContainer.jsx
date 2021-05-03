// import React from 'react';
import Navbar from "./Navbar";
import {connect} from "react-redux";

// const NavbarContainer = (props) => {
//   const friends = props.redux.getState().sidebar
//   return (
//     <Navbar friends = { friends } />
//   )
// };

const mapStateToProps = (state) => {
  return {
    friends: state.sidebar.friends
  }
}

export default connect(mapStateToProps)(Navbar)


