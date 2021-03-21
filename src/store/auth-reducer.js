import {usersAPI} from "../api/api";

const SET_USER_AUTH = "SET_USER_AUTH";

export const setUserData = (id, login, email) => ({
  type: SET_USER_AUTH,
  data: {
    id,
    login,
    email
  }
})

const initialState = {
  id: null,
  login: null,
  e_mail: null,
  isAuth: false
}

export const setUser = () => {
  return (dispatch) => {
    usersAPI.setUserData().then(response => {
      if (response.resultCode === 0) {
          const { email, login, id } = response.data;
          dispatch(setUserData(id, login, email));
        }
    })
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_AUTH: {
      return {
        ...state,
        ...action.data,
        isAuth: true
      }
    }
    default:
      return state;
  }
}

export default authReducer;