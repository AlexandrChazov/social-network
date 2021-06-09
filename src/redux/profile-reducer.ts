import {PrimaryResponseType, profileAPI, ResultCodesEnum} from "../api/api";
import {ChatsArrayType, ProfileType} from "../Types/types";
import {call, put, takeEvery} from "redux-saga/effects";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = "social-network/profile/ADD-POST";
const SET_USER_PROFILE = "social-network/profile/SET_USER_PROFILE";
const SET_USER_STATUS = "social-network/profile/SET_USER_STATUS";
const DELETE_POST = "social-network/profile/DELETE_POST";
const SET_PHOTO_SUCCESS = "social-network/profile/SET_PHOTO_SUCCESS";
const REQUEST_STATUS = "social-network/profile/REQUEST_STATUS";

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

export const requestStatus = (id: number) => ({
    type: REQUEST_STATUS,
    id
})

type ActionsTypes = AddPostActionType | DeletePostActionType | SetUserProfileActionType
    | SetUserStatusActionType | SetPhotoSuccessActionType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const initialState = {
    textareaValue: 'IT-kamasutra.com' as string,
    chats: [
        {id: 1, mess: "Hello, how are you?", likesCount: 10},
        {id: 2, mess: "What are you wont?", likesCount: 10},
        {id: 3, mess: "What are hell are you doing?", likesCount: 20},
        {id: 4, mess: "dada", likesCount: 15}
    ] as Array<ChatsArrayType>,
    profile: null as ProfileType | null,
    status: ""
}

type InitialStateType = typeof initialState;

export const getProfileInfo = (id: number): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.getProfileInfo(id);
        dispatch(setUserProfile(response));
    }
}

// export const getUserStatus = (id: number) => {
//   return async (dispatch: any) => {
//     const response = await profileAPI.getUserStatus(id);
//     dispatch(setUserStatus(response))
//   }
// }

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.updateStatus(status);
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(setUserStatus(status))
        }
        ;
    };
};

export const setPhoto = (event: any): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.sendPhoto(event.target.files[0])
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(setPhotoSuccess(response.data.photos.large))
        }
    }
}

export const setProfile = (profile: ProfileType, userID: number):
    ThunkAction<Promise<PrimaryResponseType>, AppStateType, unknown, ActionsTypes> => {
    return async (dispatch) => {
        const response = await profileAPI.sentProfileInfo(profile);
        if (response.resultCode === 0) {
            dispatch(getProfileInfo(userID))
        }
        return response;
    }
}

export function* sagaWatcher() {
    yield takeEvery(REQUEST_STATUS, sagaWorker);
}

function* sagaWorker(action: any) {
    //@ts-ignore
    const response = yield call(getStatus, action.id);
    yield put(setUserStatus(response));
}

async function getStatus(id: number) {
    const response = await profileAPI.getUserStatus(id);
    return response;
}

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
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
                ...state,
                profile: {...state.profile, photos: {...state.profile!.photos, large: action.photo}} as ProfileType
            }
        }
        default:
            return state;
    }
}

export default profileReducer;
