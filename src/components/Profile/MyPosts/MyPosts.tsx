import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import { Form, Field } from 'react-final-form';
import {validators} from "../../Common/FormValidation/FormValidation";
import {ChatsArrayType} from "../../../Types/types";
import {fieldCreator} from "../../Common/fieldCreator";
import {LoginValuesKeys} from "../../Login/Login";

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
                  {/*<Field name="myMessage"  validate={validators.maxLength(30)} >*/}
                  {/*  {*/}
                  {/*    ({input, meta}) => (*/}
                  {/*        <div>*/}
                  {/*          {*/}
                  {/*            meta.error*/}
                  {/*              ? <>*/}
                  {/*                  <textarea {...input} placeholder="Input your message" rows ={5} cols ={25} className={styles.redBorder}/>*/}
                  {/*                  <span className={styles.errorMessage}>{meta.error}</span>*/}
                  {/*                </>*/}
                  {/*              : <textarea {...input} placeholder="Input your message" rows={5} cols ={25}/>*/}
                  {/*          }*/}
                  {/*        </div>*/}
                  {/*    )*/}
                  {/*  }*/}
                  {/*</Field>*/}
                </div>
                <div>
                  <button type="submit" disabled={!values.myMessage} >Add post</button>
                </div>
              </form>
          )}
      />
  )
}

type MyPostsPropsType = {
    deletePost: (id:number) => void
    addPost: (myMessage:string) => void
    posts: Array<ChatsArrayType>
}

const MyPosts: React.FC<MyPostsPropsType> = props => {

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