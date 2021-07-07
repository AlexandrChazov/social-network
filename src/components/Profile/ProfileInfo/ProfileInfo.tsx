import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHook";
import ProfileDataForm, {FormValues} from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import {ProfileType} from "../../../Types/types";
import {PrimaryResponseType} from "../../../api/api";

type PropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    setPhoto: (event: ChangeEvent<HTMLInputElement>) => void
    isMyProfilePage: boolean
    setProfile: (profile: FormValues, userID: number) => PrimaryResponseType
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, setPhoto, isMyProfilePage, setProfile}) => {
  const [isEditMode, setEditMode] = useState(false);

    if (!profile) {
    return <Preloader />
    }

    const ProfileStatusProps = {
        status: status,
        updateStatus: updateStatus
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
                                       // isMyProfilePage = {isMyProfilePage}
                                       setEditMode = {setEditMode}/>
                      <button onClick={()=>setEditMode(false)}>Cancel</button>

                    </div>
                  : <div>
                      <ProfileData profile = {profile}/>
                      {isMyProfilePage && <button onClick={()=>setEditMode(true)}>Edit</button>}
                    </div>}
            </div>
            <ProfileStatus {...ProfileStatusProps}/>
        </div>
    )
}

export default ProfileInfo;
