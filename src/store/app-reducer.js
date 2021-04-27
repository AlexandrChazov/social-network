import {setUser} from "./auth-reducer";

const SET_AUTHORIZATION = "SET_AUTHORIZATION";

const setAuthorization = () => ({
  type: SET_AUTHORIZATION
});

const initialState = {
  isInitialized: false
}

export const initializeApp = () => (dispatch) => {
  dispatch(setUser()).then( () => {
    dispatch(setAuthorization())
  })
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