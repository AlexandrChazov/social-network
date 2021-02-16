import React from 'react';
import Navbar from "./Navbar";

const NavbarContainer = (props) => {
  const friends = props.store.getState().sidebar
  return (
    <Navbar friends = { friends } />
  )
};

export default NavbarContainer;
