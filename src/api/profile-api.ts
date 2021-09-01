import {ProfileType} from "../Types/types";
import {instance, PrimaryResponseType} from "./api";
import {FormValues} from "../components/Profile/ProfileInfo/ProfileDataForm";

type SavePhotoDataType = {
    photos: {
        small: string
        large: string
    }
}

export const profileAPI = {
    getProfileInfo(userID: number) {
        return instance.get<ProfileType>(`profile/${userID}`).then(response => {
            return response.data;
        });
    },
    getUserStatus(userID: number) {
        return instance.get<string>(`profile/status/${userID}`).then(response => {
            return response.data;
        });
    },
    updateStatus(status: string) {
        return instance.put<PrimaryResponseType>(`profile/status`, {status: status}).then(response => {
            return response.data;
        });
    },
    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put<PrimaryResponseType<SavePhotoDataType>>('profile/photo', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => response.data);
    },
    sentProfileInfo(profile: FormValues) {
        return instance.put<PrimaryResponseType>("profile", profile).then(response => {
            return response.data;
        })
    }
};
