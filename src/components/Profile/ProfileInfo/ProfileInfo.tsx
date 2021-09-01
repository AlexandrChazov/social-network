import React, {ChangeEvent, useState} from 'react';
import styles from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHook";
import ProfileDataForm, {FormValues} from "./ProfileDataForm";
import ProfileData from "./ProfileData";
import {PrimaryResponseType} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, getStatus} from "../../../redux/profile-selectors";
import {setPhoto} from "../../../redux/profile-reducer";

type PropsType = {
    isMyProfilePage: boolean
    setProfile: (profile: FormValues, userID: number) => PrimaryResponseType
}

const ProfileInfo: React.FC<PropsType> = ({isMyProfilePage, setProfile}) => {

  const profile = useSelector(getProfile);
  const status = useSelector(getStatus);

  const dispatch = useDispatch();
  const setPhoto_ = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhoto(event))
  }

  const [isEditMode, setEditMode] = useState(false);

    if (!profile) {
    return <Preloader />
    }

    return (

        <div>
            <div className={styles.descriptionBlock}>
              <div>{profile.fullName}</div>
              <img alt = "profile" src = {profile.photos.large} />
              {isMyProfilePage && <input type="file" onChange={setPhoto_}/>}
              {isEditMode
                  ? <div>
                      <ProfileDataForm profile = {profile}
                                       setProfile = {setProfile}
                                       setEditMode = {setEditMode}/>
                      <button onClick={()=>setEditMode(false)}>Cancel</button>

                    </div>
                  : <div>
                      <ProfileData profile = {profile}/>
                      {isMyProfilePage && <button onClick={()=>setEditMode(true)}>Edit</button>}
                    </div>}
            </div>
            <ProfileStatus status = {status}/>
        </div>
    )
}

export default ProfileInfo;
