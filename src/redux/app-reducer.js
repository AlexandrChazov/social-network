import {setUser} from "./auth-reducer";

const SET_AUTHORIZATION = "social-network/app/SET_AUTHORIZATION";

const setAuthorization = () => ({
  type: SET_AUTHORIZATION
});

const initialState = {
  isInitialized: false
}

export const initializeApp = () => async (dispatch) => {
  await dispatch(setUser())
  await dispatch(setAuthorization())
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHORIZATION: {
      return {
        ...state,
        isInitialized: true
      }
    }
    default: {
      return state;
    }
  }
}