import React, {useState} from "react";
import {Form} from "react-final-form";
import * as styles from "./AboutMe.module.css"
import createField from "../../Common/createField";

const ProfileDataForm = ({profile, setProfile, setEditMode}) => {
  const [errorMessages, setErrorMessages] = useState([]);
  return (
      <div>
        <Form
            initialValues={profile}  // если прописывать в инпутах value, то react-final-form будет видеть в инпутах только пустую строку
            onSubmit={async (value) => {
              const response = await setProfile(value, profile.userId)
              setErrorMessages(response.messages);
              if (response.resultCode === 0) {setEditMode(false)}
            }}

            render={({handleSubmit, submitting, pristine}) => (
                <form onSubmit={handleSubmit}>
                  {errorMessages.map((message) => {
                    return <div key={errorMessages.indexOf(message)} className={styles.errorMessage}>{message}</div>
                  })}
                  {createField("fullName", "input", "text", "Type your name", "fullName")}
                  {createField("aboutMe", "input", "text", "Some words about you", "AboutMe")}
                  {createField("lookingForAJob", "input", "checkbox", null, "lookingForAJob")}
                  {createField("lookingForAJobDescription", "input", "text", "Your skills", "lookingForAJobDescription")}
                  <label><b>contacts: </b></label>
                  {createField("contacts.facebook", "input", "text", "facebook link", "facebook")}
                  {createField("contacts.website", "input", "text", "website link", "website")}
                  {createField("contacts.vk", "input", "text", "vkontacte link", "vkontakte")}
                  {createField("contacts.twitter", "input", "text", "twitter link", "twitter")}
                  {createField("contacts.instagram", "input", "text", "instagram link", "instagram")}
                  {createField("contacts.youtube", "input", "text", "youtube link", "youtube")}
                  {createField("contacts.github", "input", "text", "github link", "github")}
                  {createField("contacts.mainLink", "input", "text", "mainLink link", "mainLink")}

                  <button type="submit" disabled={submitting || pristine}>Submit</button>
                </form>
            )}
        />
      </div>
  )
}

export default ProfileDataForm