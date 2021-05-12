import React, {useState} from "react";
import {Form, Field} from "react-final-form";
import * as styles from "./AboutMe.module.css"

const AboutMe = ({profile, setProfile, isMyProfilePage}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  return (
      <div>
        <Form
            initialValues={profile}
            onSubmit={async (value) => {
              const response = await setProfile(value, profile.userId)
              if (response.resultCode === 1) {
                setErrorMessages(response.messages)
              } else {
                setErrorMessages([])
                setEditMode(false)
              }
            }}

            render={({handleSubmit, reset, form, submitting, pristine, values}) => (

                <form onSubmit={handleSubmit}>
                  {isEditMode && errorMessages.map((message) => {
                    return <div key={errorMessages.indexOf(message)} className={styles.errorMessage}>{message}</div>
                  })}
                  <Field name="AboutMe">
                    {({input, meta}) => {
                      return (
                          <div>
                            <label><b>AboutMe: </b></label>
                            {
                              isEditMode
                                  ? <div>
                                    <input {...input} type="text" placeholder="Some words about you"/>
                                  </div>
                                  : <span>{profile.aboutMe}</span>
                            }
                          </div>

                      )
                    }}
                  </Field>
                  <Field name="lookingForAJob" component="input" type="checkbox">
                    {({input, meta}) => (
                        <div>
                          <label><b>lookingForAJob: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="checkbox"/>
                                </div>
                                : <span>{profile.lookingForAJob ? "Yes" : "No"}</span>
                          }
                        </div>
                    )}
                  </Field>

                  <Field name="lookingForAJobDescription">
                    {({input, meta}) => (
                        <div>
                          <label><b>lookingForAJobDescription: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="Your skills"/>
                                </div>
                                : <span>{profile.lookingForAJobDescription}</span>
                          }
                        </div>
                    )}
                  </Field>

                  <Field name="fullName">
                    {({input, meta}) => (
                        <div>
                          <label><b>fullName: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="Type your name"/>
                                </div>
                                : <span>{profile.fullName}</span>
                          }
                        </div>
                    )}
                  </Field>

                  <label><b>contacts: </b></label>
                  <Field name="contacts.facebook">
                    {({input, meta}) => (
                        <div>
                          <label><b>facebook: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="facebook link"/>
                                </div>
                                : <span>{profile.contacts.facebook}</span>
                          }
                        </div>
                    )}
                  </Field>
                  <Field name="contacts.website">
                    {({input, meta}) => (
                        <div>
                          <label><b>website: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="website link"/>
                                </div>
                                : <span>{profile.contacts.website}</span>
                          }
                        </div>
                    )}
                  </Field>
                  <Field name="contacts.vk">
                    {({input, meta}) => (
                        <div>
                          <label><b>vk: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="vkontacte link"/>
                                </div>
                                : <span>{profile.contacts.vk}</span>
                          }
                        </div>
                    )}
                  </Field>
                  <Field name="contacts.twitter">
                    {({input, meta}) => (
                        <div>
                          <label><b>twitter: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="your twitter link"/>
                                </div>
                                : <span>{profile.contacts.twitter}</span>
                          }
                        </div>
                    )}
                  </Field>
                  <Field name="contacts.instagram">
                    {({input, meta}) => (
                        <div>
                          <label><b>instagram: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="your instagram link"/>
                                </div>
                                : <span>{profile.contacts.instagram}</span>
                          }
                        </div>
                    )}
                  </Field>
                  <Field name="contacts.youtube">
                    {({input, meta}) => (
                        <div>
                          <label><b>youtube: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="your youtube link"/>
                                </div>
                                : <span>{profile.contacts.youtube}</span>
                          }
                        </div>
                    )}
                  </Field>
                  <Field name="contacts.github">
                    {({input, meta}) => (
                        <div>
                          <label><b>github: </b></label>
                          {
                            isEditMode
                                ? <div>
                                  <input {...input} type="text" placeholder="your github page"/>
                                </div>
                                : <span>{profile.contacts.github}</span>
                          }
                        </div>
                    )}
                  </Field><Field name="contacts.mainLink">
                  {({input, meta}) => (
                      <div>
                        <label><b>mainLink: </b></label>
                        {
                          isEditMode
                              ? <div>
                                <input {...input} type="text" placeholder="your mainLink"/>
                              </div>
                              : <span>{profile.contacts.mainLink}</span>
                        }
                      </div>
                  )}
                </Field>

                  {isEditMode && <button type="submit" disabled={submitting || pristine}>Submit</button>}
                  {isEditMode && <button onClick={() => {
                    setEditMode(false);
                    setErrorMessages([]);
                  }}>Cancel</button>}
                </form>
            )}


        />
        {isEditMode || !isMyProfilePage || <button onClick={() => {
          setEditMode(true)
        }}>Edit</button>}
      </div>
  )
}

export default AboutMe