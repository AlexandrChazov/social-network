import React from "react";
import {authAPI} from "../api/api";

const SET_USER_AUTH = "SET_USER_AUTH";
const AUTHORIZE = "AUTHORIZE";
const DELETE_AUTHORIZE = "DELETE_AUTHORIZE"

export const setUserData = (id, login, email) => ({
  type: SET_USER_AUTH,
  data: {
    id,
    login,
    email
  }
})

const authorize = () => ({
  type: AUTHORIZE,
  isAuth: true
})

const deleteAuthorization = () => ({
  type: DELETE_AUTHORIZE,
  isAuth: false
})

const initialState = {
  id: null,
  login: null,
  e_mail: null,
  isAuth: false
}

export const setUser = () => {
  return (dispatch) => {
    authAPI.setUserData().then(response => {
      if (response.resultCode === 0) {
          const { email, login, id } = response.data;
          dispatch(setUserData(id, login, email));
        }
    })
  }
}

export const authorization = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.userAuthorization(email, password, rememberMe).then(response => {
      if (response === 0) {
        dispatch(authorize())
      }
    })
  }
}

export const deleteAuth = () => {
  return (dispatch) => {
    authAPI.deleteAuthorization().then(response => {
      if (response.resultCode === 0) {
        dispatch(deleteAuthorization())
      }
    })
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH: {
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    }
    case AUTHORIZE: {
      return {
        ...state,
        isAuth: true
      }
    }
    case DELETE_AUTHORIZE: {
      return {
        ...state,
        isAuth: false
      }
    }
    default:
      return state;
  }
}

export default authReducer;