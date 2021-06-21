import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/redux-store";

type MapStateType = {
  isAuth: boolean
}

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth
  }
}

function withAuthRedirect (Component: React.ComponentType) {
  class RedirectComponent extends React.Component<MapStateType> {
    render() {
      const {isAuth, ...restProps} = this.props; // отделяем из пропсов isAuth, чтобы не передавать лишние пропсы
      if (!this.props.isAuth) return <Redirect to="/Login" />
      return <Component {...restProps} />
    }
  }
  const ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);
  return ConnectedAuthRedirectComponent;
}

// const withAuthRedirect = (Component) => {
//   const RedirectComponent = (props) => {
//     if (!props.isAuth) return <Redirect to="/Login" />
//     return <Component {...props} />
//   }
//   const ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);
//   return ConnectedAuthRedirectComponent;
// }

export default withAuthRedirect
