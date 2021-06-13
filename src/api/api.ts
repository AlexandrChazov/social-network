import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "b3c57f67-b4e1-4144-b0d1-08d0b81333e0"
    }
});

export enum ResultCodesEnum {
    Success = 0
};

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
};

export type PrimaryResponseType<D={}, RC=ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
};

