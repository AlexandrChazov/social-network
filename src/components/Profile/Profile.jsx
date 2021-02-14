import React from 'react';
// import styles from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
        <ProfileInfo/>
        <MyPosts chat = {props.chat}
                 addPost = { props.addPost }
                 updateNewPostText = { props.updateNewPostText }
                 textareaValue = { props.textareaValue } />
    </div>
  )
}

export default Profile;
