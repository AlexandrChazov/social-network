import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {setPhoto} from "../../redux/profile-reducer";

const Profile = (props) => {
  return (
    <div>
        <ProfileInfo profile = {props.profile}
                     status = {props.status}
                     updateStatus = {props.updateStatus}
                     setPhoto = {props.setPhoto}
                     isMyProfilePage = {props.isMyProfilePage}/>
        <MyPostsContainer />
    </div>
  )
}

export default Profile;
