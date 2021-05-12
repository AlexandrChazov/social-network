import React from "react";

const ProfileData = ({profile}) => {

  return (
      <div>
        <div><b>fullName: </b>{profile.fullName}</div>
        <div><b>AboutMe: </b>{profile.aboutMe}</div>
        <div><b>lookingForAJob: </b>{profile.lookingForAJob ? "Yes" : "No"}</div>
        <div><b>lookingForAJobDescription: </b>{profile.lookingForAJobDescription}</div>
        <div><b>contacts: </b></div>
        <div><b>facebook: </b>{profile.contacts.facebook}</div>
        <div><b>website: </b>{profile.contacts.website}</div>
        <div><b>vkontakte: </b>{profile.contacts.vk}</div>
        <div><b>twitter: </b>{profile.contacts.twitter}</div>
        <div><b>instagram: </b>{profile.contacts.instagram}</div>
        <div><b>youtube: </b>{profile.contacts.youtube}</div>
        <div><b>github: </b>{profile.contacts.github}</div>
        <div><b>mainLink: </b>{profile.contacts.mainLink}</div>
      </div>
  )
};

export default ProfileData;