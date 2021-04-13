import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import { Form, Field } from 'react-final-form';
import {validators} from "../../Common/FormValidation/FormValidation";

const AddPostComponent = (props) => {
  return (
      <Form
          onSubmit={(values)=> {
            props.onAddPost(values.myMessage);
            values.myMessage = "";
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field name="myMessage"  validate={validators.maxLength(30)} >
                    {
                      ({input, meta}) => (
                          <div>
                            {
                              meta.error
                                ? <>
                                    <textarea {...input} placeholder="Input your message" rows="5" cols="25" className={styles.redBorder}/>
                                    <span className={styles.errorMessage}>{meta.error}</span>
                                  </>
                                : <textarea {...input} placeholder="Input your message" rows="5" cols="25"/>
                            }
                          </div>
                      )
                    }
                  </Field>
                </div>
                <div>
                  <button type="submit" disabled={!values.myMessage} >Submit</button>
                </div>
              </form>
          )}
      />
  )
}

const MyPosts = (props) => {

  const chat = props.profilePage.chats.map( m => <Post message={m.mess} likesCount={m.likesCount} key = {m.id} />);

  const onAddPost = (myMessage) => {
    props.addPost(myMessage);
  }

  return (
      <div className={styles.postsBlock}>
        <h3>MyPosts</h3>
        <div>
          <AddPostComponent onAddPost = {onAddPost}/>
        </div>
        <div className={styles.posts}>
          { chat }
        </div>
    </div>
  )
}

export default MyPosts;
