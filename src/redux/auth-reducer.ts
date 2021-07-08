import {ResultCodeForCaptcha, ResultCodesEnum} from "../api/api";
import {InferActionsTypes, PrimaryThunkType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

export const authActions = {
  setAuthUserData: (id: number | null,
                     login: string | null,
                     email: string | null,
                     isAuth: boolean,
                     captcha = null) => ({
    type: "auth/SET_AUTH_USER_DATA",
    payload: {
      id,
      login,
      email
    },
    isAuth,
    captcha
  } as const),

  setLoginError: (loginError: any) => ({
    type: "auth/SET_LOGIN_ERROR",
    loginError: loginError
  } as const),

  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "auth/GET_CAPTCHA_SUCCESS",
    captchaUrl
  } as const)
}

const initialState = {
  id: null as number | null,
  login: null as string | null,
  e_mail: null as string | null,
  isAuth: false,
  loginError: null as string | null,
  captcha: null as string | null
}

export const setUser = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.setUserData();
    if (response.resultCode === ResultCodesEnum.Success) {
      const {email, login, id} = response.data;
      dispatch(authActions.setAuthUserData(id, login, email, true));
    }
  }
}

export const authorization = (email: string,
                              password: string,
                              rememberMe: boolean,
                              captchaUrl: string):ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captchaUrl);
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(setUser());
      dispatch(authActions.setLoginError(null));
    } else {
      if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptcha());
      }
      dispatch(authActions.setLoginError(response.messages[0]))
    }
  }
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.logout();
      if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(authActions.setAuthUserData(null, null, null, false))
      }
  }
}

export const getCaptcha = (): ThunkType=> {
  return async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(authActions.getCaptchaUrlSuccess(response))
  }
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "auth/SET_AUTH_USER_DATA": {
      return {
        ...state,
        ...action.payload,
        isAuth: action.isAuth,
        captcha: action.captcha
      }
    }
    case "auth/SET_LOGIN_ERROR": {
      return {
        ...state,
        loginError: action.loginError
      }
    }
    case "auth/GET_CAPTCHA_SUCCESS": {
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



type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof authActions>;
type ThunkType = PrimaryThunkType<ActionsType>;
