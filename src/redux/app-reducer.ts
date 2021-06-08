import {setUser} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

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

type ActionsTypes = SetAutorizationActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(setUser());
  await dispatch(setAuthorization());
}

export const appReducer = (state = initialState, action: ActionsTypes): typeof initialState => {
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
