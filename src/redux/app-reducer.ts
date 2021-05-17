import {setUser} from "./auth-reducer";

const SET_AUTHORIZATION = "social-network/app/SET_AUTHORIZATION";

type SetAutorizationActionType = {
  type: typeof SET_AUTHORIZATION
}

const setAuthorization = (): SetAutorizationActionType => ({
  type: SET_AUTHORIZATION
});

const initialState = {
  isInitialized: false as boolean
}

export const initializeApp = () => async (dispatch: Function) => {
  await dispatch(setUser())
  await dispatch(setAuthorization())
}

type ActionType = {
  type: string
}

export const appReducer = (state = initialState, action: ActionType): typeof initialState => {
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