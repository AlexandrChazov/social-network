import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {

  const chat = props.profilePage.chats.map( m => <Post message={m.mess} likesCount={m.likesCount}/>);

  const newPostElement = React.createRef();

  const onPostChange = () => {
    const text = newPostElement.current.value;
    props.updateNewPostText(text);
  }

  const onAddPost = () => {
    props.addPost();
  }

  return (
      <div className={styles.postsBlock}>
        <h3>MyPosts</h3>
        <div>
          <div>
            <textarea onChange = { onPostChange } ref = { newPostElement } name="write" cols="30" rows="10"  value = { props.profilePage.textareaValue }/>
          </div>
          <div>
            <button onClick = { onAddPost }>Add post</button>
          </div>
        </div>
        <div className={styles.posts}>
          { chat }
        </div>
    </div>
  )
}

export default MyPosts;
