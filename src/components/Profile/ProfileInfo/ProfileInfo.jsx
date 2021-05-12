import React, {useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHook";
import ProfileDataForm from "./ProfileDataForm";
import ProfileData from "./ProfileData";

const ProfileInfo = ({profile, status, updateStatus, setPhoto, isMyProfilePage, setProfile}) => {
  const [isEditMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />
  }

    return (
        <div>
            <div className={styles.descriptionBlock}>
              <div>{profile.fullName}</div>
              <img alt = "profile" src = {profile.photos.large} />
              {isMyProfilePage && <input type="file" onChange={setPhoto}/>}
              {isEditMode
                  ? <div>
                      <ProfileDataForm profile = {profile}
                                       setProfile = {setProfile}
                                       isMyProfilePage = {isMyProfilePage}
                                       setEditMode = {setEditMode}/>
                      <button onClick={()=>setEditMode(false)}>Cancel</button>

                    </div>
                  : <div>
                      <ProfileData profile = {profile}/>
                      {isMyProfilePage && <button onClick={()=>setEditMode(true)}>Edit</button>}
                    </div>}
            </div>
            <ProfileStatus status = {status}
                           updateStatus={updateStatus}/>
        </div>
    )
}

export default ProfileInfo;