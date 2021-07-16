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

const withProfileRedirect = (Component: React.ComponentType) => {
  class RedirectComponent extends React.Component<MapStateType> {
    render() {
      if (this.props.isAuth) return <Redirect to="/Profile" />
      return <Component {...this.props} />
    }
  }
  const ConnectedProfileRedirectComponent = connect(mapStateToProps)(RedirectComponent);
  return ConnectedProfileRedirectComponent;
}

// const withAuthRedirect = (Component) => {
//   const RedirectComponent = (props) => {
//     if (!props.isAuth) return <Redirect to="/Login" />
//     return <Component {...props} />
//   }
//   const ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);
//   return ConnectedAuthRedirectComponent;
// }

export default withProfileRedirect
