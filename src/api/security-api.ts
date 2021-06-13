import {instance} from "./api";

type GetCaptchaUrlType = {
    url: string
};

export const securityAPI = {
    getCaptchaUrl: async () => {
        const response = await instance.get<GetCaptchaUrlType>("security/get-captcha-url");
        return response.data.url
    }
};
