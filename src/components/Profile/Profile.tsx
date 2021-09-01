import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {FormValues} from "./ProfileInfo/ProfileDataForm";
import {PrimaryResponseType} from "../../api/api";

type PropsType = {
    isMyProfilePage: boolean
    setProfile: (profile: FormValues, userID: number) => PrimaryResponseType
}

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
        <ProfileInfo isMyProfilePage = {props.isMyProfilePage}
                     setProfile = {props.setProfile}/>
        <MyPostsContainer />
    </div>
  )
}

export default Profile;
