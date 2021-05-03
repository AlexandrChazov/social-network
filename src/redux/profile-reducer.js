import {profileAPI} from "../api/api";

const ADD_POST = "social-network/profile/ADD-POST";
const SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "social-network/profile/SET_USER_STATUS";
const DELETE_POST = "social-network/profile/DELETE_POST";

export const addPostActionCreator = (myMessage) => ({
  type: ADD_POST,
  myMessage: myMessage
});

export const deletePost = (id) => ({
  type: DELETE_POST,
  id
})

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
  return async (dispatch) => {
    const response = await profileAPI.getProfileInfo(id)
    dispatch(setUserProfile(response));
  }
}

export const getUserStatus = (id) => {
  return async (dispatch) => {
    const response = await profileAPI.getUserStatus(id);
    dispatch(setUserStatus(response))
  }
}

export const updateStatus = (status) => {
  return async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
      if (response.resultCode === 0) {
        dispatch(setUserStatus(status))
      }
  }
}

export const profileReducer = (state = initialState, action) => {
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
    case DELETE_POST: {
      return {
        ...state, chats: state.chats.filter(message => message.id !== action.id)
      }
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