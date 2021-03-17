const SET_USER_AUTH = "SET_USER_AUTH";

export const setUserData = (id, login, e_mail) => ({
  type: SET_USER_AUTH,
  data: {
    id,
    login,
    e_mail
  }
})

const initialState = {
  id: null,
  login: null,
  e_mail: null,
  isAuth: false
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