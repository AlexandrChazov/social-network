import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";
import { Form, Field } from 'react-final-form';

const AddPostComponent = (props) => {
  return (
      <Form
          onSubmit={(values)=> {
            props.onAddPost(values.myMessage);
            values.myMessage = "";
          }}
          render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Field name="myMessage" component="textarea" placeholder="Input your message" />
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
