import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {authorization} from "../../store/auth-reducer";
import {compose} from "redux";
import withProfileRedirect from "../Hoc/withProfileRedirect";

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default compose(
    connect(mapStateToProps, {authorization}),
    withProfileRedirect
)(Login)



