import {setUser} from "./auth-reducer";
import {InferActionsTypes, PrimaryThunkType} from "./redux-store";

const appActions = {
  setAuthorization: () => ({
    type: "app/SET_AUTHORIZATION"
  } as const)
}

const initialState = {
  isInitialized: false as boolean
}

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(setUser());
  await dispatch(appActions.setAuthorization());
}

export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "app/SET_AUTHORIZATION": {
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


type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof appActions>;
type ThunkType = PrimaryThunkType<ActionsTypes>;
