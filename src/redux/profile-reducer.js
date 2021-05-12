import {profileAPI} from "../api/api";

const ADD_POST = "social-network/profile/ADD-POST";
const SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "social-network/profile/SET_USER_STATUS";
const DELETE_POST = "social-network/profile/DELETE_POST";
const SET_PHOTO_SUCCESS = "social-network/profile/SET_PHOTO_SUCCESS"

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

const setPhotoSuccess = (photo) => ({
  type: SET_PHOTO_SUCCESS,
  photo
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

export const setPhoto = (event) => {
  return async (dispatch) => {
    const response = await profileAPI.sendPhoto(event.target.files[0])
      if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos.large))
      }
  }
}

export const setProfile = (profile, userID) => {
  return async (dispatch) => {
    const response = await profileAPI.sentProfileInfo(profile)
    if (response.resultCode === 0) {
      dispatch(getProfileInfo(userID))
    }
    return response
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
    case SET_PHOTO_SUCCESS: {
      return {
        ...state, profile: {...state.profile, photos: {...state.profile.photos, large: action.photo}}
      }
    }
    default:
      return state;
  }
}

export default profileReducer;