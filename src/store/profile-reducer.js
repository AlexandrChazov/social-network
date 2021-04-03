import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";

export const addPostActionCreator = (myMessage) => ({
  type: ADD_POST,
  myMessage: myMessage
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile: profile
});

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status: status
})

const initialState = {
  textareaValue: 'IT-kamasutra.com',
  chats : [
    {id: 1, mess: "Hello, how are you?", likesCount: 10},
    {id: 2, mess: "What are you wont?", likesCount: 10},
    {id: 3, mess: "What are hell are you doing?", likesCount: 20},
    {id: 4, mess: "dada", likesCount: 15}
  ],
  profile: null,
  status: ""
}

export const getProfileInfo = (id) => {
  return (dispatch) => {
    profileAPI.getProfileInfo(id).then(response => {
      dispatch(setUserProfile(response));
    })
  }
}

export const getUserStatus = (id) => {
  return (dispatch) => {
    profileAPI.getUserStatus(id).then(response => {
      dispatch(setUserStatus(response))
    })
  }
}

export const updateStatus = (status) => {
  return (dispatch) => {
    profileAPI.updateStatus(status).then(response => {
      if (response === 0) {
        dispatch(setUserStatus(status))
      }
    })
  }
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {...state,
        chats: [...state.chats,
          {
            id: state.chats.length + 1,
            mess: action.myMessage,
            likesCount: 0
          }],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile
      }
    }
    case SET_USER_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    default:
      return state;
  }
}

export default profileReducer;