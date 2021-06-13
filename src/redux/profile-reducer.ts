import {PrimaryResponseType, ResultCodesEnum} from "../api/api";
import {ChatsArrayType, ProfileType} from "../Types/types";
import {call, put, takeEvery} from "redux-saga/effects";
import {InferActionsTypes, PrimaryThunkType} from "./redux-store";
import {profileAPI} from "../api/profile-api";

export const profileActions = {
    addPostActionCreator: (myMessage: string) => ({
        type: "profile/ADD-POST",
        myMessage: myMessage
    } as const),

    deletePost: (id: number) => ({
        type: "profile/DELETE_POST",
        id
    } as const),

    setUserProfile: (profile: ProfileType) => ({
        type: "profile/SET_USER_PROFILE",
        profile: profile
    } as const),

    setUserStatus: (status: string) => ({
        type: "profile/SET_USER_STATUS",
        status: status
    } as const),

    setPhotoSuccess: (photo: string) => ({
        type: "profile/SET_PHOTO_SUCCESS",
        photo
    } as const),

    requestStatus: (id: number) => ({
        type: "profile/REQUEST_STATUS",
        id
    } as const)
}

const initialState = {
    textareaValue: 'IT-kamasutra.com' as string,
    posts: [
        {id: 1, mess: "Hello, how are you?", likesCount: 10},
        {id: 2, mess: "What are you wont?", likesCount: 10},
        {id: 3, mess: "What are hell are you doing?", likesCount: 20},
        {id: 4, mess: "dada", likesCount: 15}
    ] as Array<ChatsArrayType>,
    profile: null as ProfileType | null,
    status: ""
}

export const getProfileInfo = (id: number): ThunkType => {
    return async (dispatch) => {
        const response = await profileAPI.getProfileInfo(id);
        dispatch(profileActions.setUserProfile(response));
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
            dispatch(profileActions.setUserStatus(status))
        }
        ;
    };
};

export const savePhoto = (event: Event): ThunkType => {
    return async (dispatch) => {
        const target= event.target as HTMLInputElement;
        const response = await profileAPI.savePhoto((target.files as FileList)[0])
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(profileActions.setPhotoSuccess(response.data.photos.large))
        }
    }
}

export const setProfile = (profile: ProfileType, userID: number): SetProfileThunkType=> {
    return async (dispatch) => {
        const response = await profileAPI.sentProfileInfo(profile);
        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(getProfileInfo(userID))
        }
        return response;
    }
}

export function* sagaWatcher() {
    yield takeEvery("profile/REQUEST_STATUS", sagaWorker);
}

function* sagaWorker(action: any) {
    //@ts-ignore
    const response = yield call(getStatus, action.id);
    yield put(profileActions.setUserStatus(response));
}

async function getStatus(id: number) {
    const response = await profileAPI.getUserStatus(id);
    return response;
}

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "profile/ADD-POST": {
            return {
                ...state,
                posts: [...state.posts,
                    {
                        id: state.posts.length + 1,
                        mess: action.myMessage,
                        likesCount: 0
                    }],
            };
        }
        case "profile/DELETE_POST": {
            return {
                ...state, posts: state.posts.filter(message => message.id !== action.id)
            }
        }
        case "profile/SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "profile/SET_USER_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "profile/SET_PHOTO_SUCCESS": {
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


type ActionsTypes = InferActionsTypes<typeof profileActions>;
type ThunkType = PrimaryThunkType<ActionsTypes>;
type SetProfileThunkType = PrimaryThunkType<ActionsTypes, Promise<PrimaryResponseType>>
type InitialStateType = typeof initialState;
