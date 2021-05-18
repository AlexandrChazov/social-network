import {profileAPI} from "../api/api";
import {ChatsArrayType, ProfileType} from "../Types/types";

const ADD_POST = "social-network/profile/ADD-POST";
const SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "social-network/profile/SET_USER_STATUS";
const DELETE_POST = "social-network/profile/DELETE_POST";
const SET_PHOTO_SUCCESS = "social-network/profile/SET_PHOTO_SUCCESS"

type AddPostActionType = {
  type: typeof ADD_POST
  myMessage: string
}

export const addPostActionCreator = (myMessage: string): AddPostActionType => ({
  type: ADD_POST,
  myMessage: myMessage
});

type DeletePostActionType = {
  type: typeof DELETE_POST
  id: number
}

export const deletePost = (id: number): DeletePostActionType => ({
  type: DELETE_POST,
  id
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile: profile
});

type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS
  status: string
}

export const setUserStatus = (status: string): SetUserStatusActionType => ({
  type: SET_USER_STATUS,
  status: status
})

type SetPhotoSuccessActionType = {
  type: typeof SET_PHOTO_SUCCESS
  photo: string
}

const setPhotoSuccess = (photo: string): SetPhotoSuccessActionType => ({
  type: SET_PHOTO_SUCCESS,
  photo
})

const initialState = {
  textareaValue: 'IT-kamasutra.com' as string,
  chats : [
    {id: 1, mess: "Hello, how are you?", likesCount: 10},
    {id: 2, mess: "What are you wont?", likesCount: 10},
    {id: 3, mess: "What are hell are you doing?", likesCount: 20},
    {id: 4, mess: "dada", likesCount: 15}
  ] as Array<ChatsArrayType>,
  profile: null as ProfileType | null,
  status: ""
}

type InitialStateType = typeof initialState;

export const getProfileInfo = (id: number) => {
  return async (dispatch: any) => {
    const response = await profileAPI.getProfileInfo(id)
    dispatch(setUserProfile(response));
  }
}

export const getUserStatus = (id: number) => {
  return async (dispatch: any) => {
    const response = await profileAPI.getUserStatus(id);
    dispatch(setUserStatus(response))
  }
}

export const updateStatus = (status: string) => {
  return async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
      if (response.resultCode === 0) {
        dispatch(setUserStatus(status))
      }
  }
}

export const setPhoto = (event: any) => {
  return async (dispatch: any) => {
    const response = await profileAPI.sendPhoto(event.target.files[0])
      if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos.large))
      }
  }
}

export const setProfile = (profile: ProfileType, userID: number) => {
  return async (dispatch: any) => {
    const response = await profileAPI.sentProfileInfo(profile)
    if (response.resultCode === 0) {
      dispatch(getProfileInfo(userID))
    }
    return response;
  }
}

export const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        ...state, profile: {...state.profile, photos: {...state.profile!.photos, large: action.photo}} as ProfileType
      }
    }
    default:
      return state;
  }
}

export default profileReducer;