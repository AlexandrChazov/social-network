// import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {authorization} from "../../redux/auth-reducer";
import {compose} from "redux";
import withProfileRedirect from "../../Hoc/withProfileRedirect";

const mapStateToProps = (state) => ({
  loginError: state.auth.loginError
})

export default compose(
    connect(mapStateToProps, {authorization}),
    withProfileRedirect
)(Login)



