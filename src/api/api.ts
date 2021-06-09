import axios from "axios";
import {ProfileType, UserType} from "../Types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "b3c57f67-b4e1-4144-b0d1-08d0b81333e0"
    }
});

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
};

export const usersAPI = {
    getUsers(pageSize: number = 5, currentPage: number) {
        return instance.get<UsersResponseType>(`users?count=${pageSize}&page=${currentPage}`).then(response => {
            return response.data
        })
    },
    unFollow(id: number) {
        return instance.delete<PrimaryResponseType>(`follow/${id}`).then(response => {
            return response.data
        })
    },
    follow(id: number) {
        return instance.post<PrimaryResponseType>(`follow/${id}`).then(response => {
            return response.data;
        });
    },
};

type SendPhotoResponseType = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const profileAPI = {
    getProfileInfo(userID: number) {
        return instance.get<ProfileType>(`profile/${userID}`).then(response => {
            return response.data;
        });
    },
    getUserStatus(userID: number) {
        return instance.get<any>(`profile/status/${userID}`).then(response => {
            return response.data;
        });
    },
    updateStatus(status: string) {
        return instance.put<PrimaryResponseType>(`profile/status`, {status: status}).then(response => {
            return response.data;
        });
    },
    sendPhoto(photo: any) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put<SendPhotoResponseType>('profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data);
    },
    sentProfileInfo(profile: ProfileType) {
        return instance.put<PrimaryResponseType>("profile", profile).then(response => {
            return response.data;
        })
    }
};

export enum ResultCodesEnum {
    Success = 0
};

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
};

type SetUserDataResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
};

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
};

export type PrimaryResponseType = {
    data: {}
    resultCode: ResultCodesEnum
    messages: Array<string>
};

export const authAPI = {
    setUserData() {
        return instance.get<SetUserDataResponseType>(`auth/me`).then(response => {
            return response.data
        });
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<LoginResponseType>(`auth/login`, {
            email: email,
            password: password,
            rememberMe: rememberMe,
            captcha: captcha
        }).then(response => {
            return response.data
        });
    },
    logout() {
        return instance.delete<PrimaryResponseType>(`auth/login`).then(response => {
            return response.data
        });
    }
};

type ReceiveCaptchaType = {
    url: string
};

export const securityAPI = {
    receiveCaptcha: async () => {
        const response = await instance.get<ReceiveCaptchaType>("security/get-captcha-url");
        return response.data.url
    }
};
