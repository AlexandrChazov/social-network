import {authAPI} from "../api/api";

const AUTHORIZE = "AUTHORIZE";

const authorize = () => ({
  type: AUTHORIZE,
  isAuth: true
})

const initialState = {
  isAuth: false
}

export const authorization = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.userAuthorization(email, password, rememberMe).then(response => {
      if (response === 0) {
        debugger
        dispatch(authorize)
      }
    })
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHORIZE: {
      return {
        ...state,
        isAuth: true
      }
    }
    default:
      return state;
  }
}

export default loginReducer;

