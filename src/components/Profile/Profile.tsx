import React, {ChangeEvent} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Types/types";
import {FormValues} from "./ProfileInfo/ProfileDataForm";
import {PrimaryResponseType} from "../../api/api";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string)=> void
    setPhoto: (event: ChangeEvent<HTMLInputElement>) => void
    isMyProfilePage: boolean
    setProfile: (profile: FormValues, userID: number) => PrimaryResponseType
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
        <ProfileInfo profile = {props.profile}
                     status = {props.status}
                     updateStatus = {props.updateStatus}
                     setPhoto = {props.setPhoto}
                     isMyProfilePage = {props.isMyProfilePage}
                     setProfile = {props.setProfile}/>
        <MyPostsContainer />
    </div>
  )
}

export default Profile;
