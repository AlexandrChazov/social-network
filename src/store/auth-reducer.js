import React from "react";
import {authAPI} from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"

export const setAuthUserData = (id, login, email, isAuth) => ({
  type: SET_AUTH_USER_DATA,
  payload: {
    id,
    login,
    email
  },
  isAuth
})

const setLoginError = (loginError) => ({
  type: SET_LOGIN_ERROR,
  loginError: loginError
})

const initialState = {
  id: null,
  login: null,
  e_mail: null,
  isAuth: false,
  loginError: null
}

export const setUser = () => {
  return (dispatch) => {
    authAPI.setUserData().then(response => {
      if (response.resultCode === 0) {
          const { email, login, id } = response.data;
          dispatch(setAuthUserData(id, login, email, true));
        }
    })
  }
}

export const authorization = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.userAuthorization(email, password, rememberMe).then(response => {
      if (response.resultCode === 0) {
        dispatch(setUser())
      } else {
        dispatch(setLoginError(response.messages[0]))
      }
    })
  }
}

export const deleteAuth = () => {
  return (dispatch) => {
    authAPI.deleteAuthorization().then(response => {
      if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
    })
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        ...action.payload,
        isAuth: action.isAuth
      }
    }
    case SET_LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.loginError
      }
    }
    default:
      return state;
  }
}

export default authReducer;