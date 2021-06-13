import {instance, PrimaryResponseType, ResultCodeForCaptcha, ResultCodesEnum} from "./api";

type SetUserDataType = {
    id: number
    email: string
    login: string
};

type LoginDataType = {
    userId: number
};

export const authAPI = {
    setUserData() {
        return instance.get<PrimaryResponseType<SetUserDataType>>(`auth/me`).then(response => {
            return response.data
        });
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<PrimaryResponseType<LoginDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, {
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
