import {authAPI, securityAPI} from "../api/api";

const SET_AUTH_USER_DATA = "social-network/auth/SET_AUTH_USER_DATA";
const SET_LOGIN_ERROR = "social-network/auth/SET_LOGIN_ERROR";
const GET_CAPTCHA_SUCCESS = "social-network/profile/GET_CAPTCHA_SUCCESS";

export const setAuthUserData = (id, login, email, isAuth, captcha = null) => ({
  type: SET_AUTH_USER_DATA,
  payload: {
    id,
    login,
    email
  },
  isAuth,
  captcha
})

const setLoginError = (loginError) => ({
  type: SET_LOGIN_ERROR,
  loginError: loginError
})

const getCaptchaSuccess = (captcha) => ({
  type: GET_CAPTCHA_SUCCESS,
  captcha
})

const initialState = {
  id: null,
  login: null,
  e_mail: null,
  isAuth: false,
  loginError: null,
  captcha: null
}

export const setUser = () => {
  return async (dispatch) => {
    const response = await authAPI.setUserData();
    if (response.resultCode === 0) {
      const {email, login, id} = response.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  }
}

export const authorization = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    const response = await authAPI.userAuthorization(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
      dispatch(setUser())
      dispatch(setLoginError(null))
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptcha())
      }
      dispatch(setLoginError(response.messages[0]))
    }
  }
}

export const deleteAuth = () => {
  return async (dispatch) => {
    const response = await authAPI.deleteAuthorization();
      if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
  }
}

export const getCaptcha = () => {
  return async (dispatch) => {
    const response = await securityAPI.receiveCaptcha();
    dispatch(getCaptchaSuccess(response))
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        ...action.payload,
        isAuth: action.isAuth,
        captcha: action.captcha
      }
    }
    case SET_LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.loginError
      }
    }
    case GET_CAPTCHA_SUCCESS: {
      return {
        ...state,
        captcha: action.captcha
      }
    }
    default:
      return state;
  }
}

export default authReducer;