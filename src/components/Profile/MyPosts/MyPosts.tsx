import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import { Form, Field } from 'react-final-form';
import {validators} from "../../Common/FormValidation/FormValidation";
import {ChatsArrayType} from "../../../Types/types";
import {fieldCreator} from "../../Common/fieldCreator";

type AddPostComponentPropsType = {
    onAddPost: (myMessage:string) => void
}

type FormValues = {
    myMessage: string
}

type FormValuesKeys = Extract<keyof FormValues, string>

const AddPostComponent: React.FC<AddPostComponentPropsType> = (props) => {
  return (
      <Form
          onSubmit={(values: FormValues)=> {
            props.onAddPost(values.myMessage);
            values.myMessage = "";
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <div>
                    {fieldCreator<FormValuesKeys>(
                        "textarea",
                        "myMessage",
                        [validators.maxLength(30)],
                        "text",
                        "Input your message",
                        "",
                        20,
                        3)}
                </div>
                <div>
                  <button type="submit" disabled={!values.myMessage} >Add post</button>
                </div>
              </form>
          )}
      />
  )
}

export type MapPropsType = {
    posts: Array<ChatsArrayType>
}

export type DispatchPropsType = {
    deletePost: (id:number) => void
    addPost: (myMessage:string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {

  const chat = props.posts.map( m => <Post message={m.mess}
                                           likesCount={m.likesCount}
                                           id={m.id}
                                           deletePost = {props.deletePost}
                                           key = {m.id}/>);

  const onAddPost = (myMessage: string) => {
    props.addPost(myMessage);
  }

  return (
      <div className={styles.postsBlock}>
        <h3>MyPosts</h3>
        <div>
          <AddPostComponent onAddPost = {onAddPost} />
        </div>
        <div className={styles.posts}>
          { chat }
        </div>
    </div>
  )
}

export default MyPosts;