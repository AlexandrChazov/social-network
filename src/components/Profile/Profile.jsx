import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
  return (
    <div>
        <ProfileInfo profile = {props.profile}
                     status = {props.status}
                     updateStatus = {props.updateStatus}
                     setPhoto = {props.savePhoto}
                     isMyProfilePage = {props.isMyProfilePage}
                     setProfile = {props.setProfile}/>
        <MyPostsContainer />
    </div>
  )
}

export default Profile;
