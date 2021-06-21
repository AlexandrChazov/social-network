import React from "react";
import Login from "./Login";
import {connect} from "react-redux";
import {authorization} from "../../redux/auth-reducer";
import {compose} from "redux";
import withProfileRedirect from "../../Hoc/withProfileRedirect";
import {AppStateType} from "../../redux/redux-store";

export type LoginMapStatePropsType = {
  loginError: string | null
  captcha: string | null
}

export type LoginMapDispatchPropsType = {
  authorization: (email: string, password: string, rememberMe: boolean, captchaUrl: string) => void
}

type OwnPropsType = {

}

const mapStateToProps = (state: AppStateType): LoginMapStatePropsType => ({
  loginError: state.auth.loginError,
  captcha: state.auth.captcha
})

export default compose(
    connect<LoginMapStatePropsType, LoginMapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {authorization}),
    withProfileRedirect
)(Login) as React.ComponentType;



