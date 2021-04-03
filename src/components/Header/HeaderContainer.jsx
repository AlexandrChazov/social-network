import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import { /*setUserData*/ setUser, deleteAuth } from "../../store/auth-reducer";

class HeaderContainer extends React.Component {

  componentDidMount() {
    this.props.setUser()
  }

  render () {
      return (
        <Header {...this.props} />
      )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect(mapStateToProps, {
  // setUserData,
  setUser,
  deleteAuth
})(HeaderContainer);
