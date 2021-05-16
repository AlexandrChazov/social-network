import {setUser} from "./auth-reducer";

const SET_AUTHORIZATION = "social-network/app/SET_AUTHORIZATION";

type SETAUTORIZATIONTYPE = () => ({
  type: typeof SET_AUTHORIZATION
})

const setAuthorization: SETAUTORIZATIONTYPE = () => ({
  type: SET_AUTHORIZATION
});

const initialState = {
  isInitialized: false as boolean
}

export const initializeApp = () => async (dispatch: Function) => {
  await dispatch(setUser())
  await dispatch(setAuthorization())
}

type ACTIONTYPE = {
  type: string
}

export const appReducer = (state = initialState, action: ACTIONTYPE) => {
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