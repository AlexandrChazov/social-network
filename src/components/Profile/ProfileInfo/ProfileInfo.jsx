import React from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHook";

const ProfileInfo = ({profile, status, updateStatus}) => {
  if (!profile) {
    return <Preloader />
  }
    return (
        <div>
            <div className={styles.descriptionBlock}>
              <div>{profile.fullName}</div>
              <img alt = "profile" src = {profile.photos.large} />
              <div>{profile.aboutMe}</div>
            </div>
            <ProfileStatus status = {status}
                           updateStatus={updateStatus}/>
        </div>
    )
}

export default ProfileInfo;