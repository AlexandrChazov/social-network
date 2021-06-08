import {authAPI, securityAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_AUTH_USER_DATA = "social-network/auth/SET_AUTH_USER_DATA";
const SET_LOGIN_ERROR = "social-network/auth/SET_LOGIN_ERROR";
const GET_CAPTCHA_SUCCESS = "social-network/profile/GET_CAPTCHA_SUCCESS";

type SetAuthUserDataPayloadType = {
  id: number | null
  login: string | null
  email: string | null
}

type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA
  payload: SetAuthUserDataPayloadType
  isAuth: boolean
  captcha: string | null
}

export const setAuthUserData = (id: number | null,
                                login: string | null,
                                email: string | null,
                                isAuth: boolean,
                                captcha = null): SetAuthUserDataActionType => ({
  type: SET_AUTH_USER_DATA,
  payload: {
    id,
    login,
    email
  },
  isAuth,
  captcha
})

type SetLoginErrorActionType = {
  type: typeof SET_LOGIN_ERROR,
  loginError: any
}

const setLoginError = (loginError: any): SetLoginErrorActionType => ({
  type: SET_LOGIN_ERROR,
  loginError: loginError
})

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_SUCCESS,
  captchaUrl: string
}

const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_SUCCESS,
  captchaUrl
})

const initialState = {
  id: null as number | null,
  login: null as string | null,
  e_mail: null as string | null,
  isAuth: false,
  loginError: null as string | null,
  captcha: null as string | null
}

type InitialStateType = typeof initialState;
type ActionsTypes = SetAuthUserDataActionType | SetLoginErrorActionType | GetCaptchaUrlSuccessActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const setUser = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.setUserData();
    if (response.resultCode === 0) {
      const {email, login, id} = response.data;
      dispatch(setAuthUserData(id, login, email, true));
    }
  }
}

export const authorization = (email: string,
                              password: string,
                              rememberMe: boolean,
                              captchaUrl: string):ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.userAuthorization(email, password, rememberMe, captchaUrl);
    if (response.resultCode === 0) {
      dispatch(setUser());
      dispatch(setLoginError(null));
    } else {
      if (response.resultCode === 10) {
        dispatch(getCaptcha());
      }
      dispatch(setLoginError(response.messages[0]))
    }
  }
}

export const deleteAuth = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.deleteAuthorization();
      if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
      }
  }
}

export const getCaptcha = (): ThunkType=> {
  return async (dispatch) => {
    const response = await securityAPI.receiveCaptcha();
    dispatch(getCaptchaUrlSuccess(response))
  }
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
        captcha: action.captchaUrl
      }
    }
    default:
      return state;
  }
}

export default authReducer;
