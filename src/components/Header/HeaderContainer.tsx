import React from 'react';
import Header, {HeaderDispatchPropsType, HeaderMapPropsType} from "./Header";
import {connect} from "react-redux";
import { logout } from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderMapPropsType & HeaderDispatchPropsType> {

  // componentDidMount() {
  //   this.props.setUser()
  // }

  render () {
      return (
        <Header {...this.props} />
      )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login
})

export default connect<HeaderMapPropsType, HeaderDispatchPropsType, {}, AppStateType>(
    mapStateToProps, {
  // setUser,
  logout
})(HeaderContainer);
