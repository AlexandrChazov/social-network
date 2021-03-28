import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Redirect to="/Login" />
      return <Component {...this.props} />
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
