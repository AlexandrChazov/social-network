import React, {useState} from "react";
import {Form} from "react-final-form";
import styles from "./AboutMe.module.css"
import {createField} from "../../Common/createField";
import {ProfileType} from "../../../Types/types";
import {PrimaryResponseType} from "../../../api/api";

export type FormValues = {
    "fullName": string
    "aboutMe": string
    "lookingForAJob": string
    "lookingForAJobDescription": string
    "contacts.facebook": string
    "contacts.website": string
    "contacts.vk": string
    "contacts.twitter": string
    "contacts.instagram": string
    "contacts.youtube": string
    "contacts.github": string
    "contacts.mainLink": string
}

type FieldsNamesType = Extract<keyof FormValues, string>;

type PropsType = {
    profile: ProfileType
    setProfile: (profile: FormValues, userID: number) => PrimaryResponseType
    setEditMode: (arg0: boolean) => void
}

const ProfileDataForm: React.FC<PropsType> = ({profile, setProfile, setEditMode}) => {
  const [errorMessages, setErrorMessages] = useState([] as Array<string>);
  return (
      <div>
        <Form
            initialValues={profile}  // если прописывать в инпутах value, то react-final-form будет видеть в инпутах только пустую строку
            onSubmit={async (value: FormValues) => {
              const response = await setProfile(value, profile.userId)
              setErrorMessages(response.messages);
              if (response.resultCode === 0) {setEditMode(false)}
            }}

            render={({handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  {errorMessages.map((message) => {
                    return <div key={errorMessages.indexOf(message)} className={styles.errorMessage}>{message}</div>
                  })}

                  {createField<FieldsNamesType>("fullName", "input", "text", "Type your name", "fullName")}
                  {createField<FieldsNamesType>("aboutMe", "input", "text", "Some words about you", "AboutMe")}
                  {createField<FieldsNamesType>("lookingForAJob", "input", "checkbox", null, "lookingForAJob")}
                  {createField<FieldsNamesType>("lookingForAJobDescription", "input", "text", "Your skills", "lookingForAJobDescription")}
                  <label><b>contacts: </b></label>
                  {createField<FieldsNamesType>("contacts.facebook", "input", "text", "facebook link", "facebook")}
                  {createField<FieldsNamesType>("contacts.website", "input", "text", "website link", "website")}
                  {createField<FieldsNamesType>("contacts.vk", "input", "text", "vkontacte link", "vkontakte")}
                  {createField<FieldsNamesType>("contacts.twitter", "input", "text", "twitter link", "twitter")}
                  {createField<FieldsNamesType>("contacts.instagram", "input", "text", "instagram link", "instagram")}
                  {createField<FieldsNamesType>("contacts.youtube", "input", "text", "youtube link", "youtube")}
                  {createField<FieldsNamesType>("contacts.github", "input", "text", "github link", "github")}
                  {createField<FieldsNamesType>("contacts.mainLink", "input", "text", "mainLink link", "mainLink")}

                  <button type="submit" disabled={submitting || pristine}>Submit</button>
                </form>
            )}
        />
      </div>
  )
}

export default ProfileDataForm