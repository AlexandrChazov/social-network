import React from 'react';
import styles from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = (props) => {

  const chat = props.chat.map( m => <Post message={m.mess} likesCount={m.likesCount}/>);

  const newPostElement = React.createRef();

  const addPost = () => {
    // props.addPost();
    const action = {
      type: "ADD-POST"
    };
    props.dispatch(action);
  }

  const onPostChange = () => {
    const text = newPostElement.current.value;
    const action = {
      type: "UPDATE-NEW-POST-TEXT",
      newPost: text,
    };
    // props.updateNewPostText(text);
    props.dispatch(action);
  }

  return (
      <div className={styles.postsBlock}>
        <h3>MyPosts</h3>
        <div>
          <div>
            <textarea onChange = { onPostChange } ref = { newPostElement } name="write" cols="30" rows="10"  value = { props.textareaValue }/>
          </div>
          <div>
            <button onClick = { addPost }>Add post</button>
          </div>
        </div>
        <div className={styles.posts}>
          { chat }
        </div>
    </div>
  )
}

export default MyPosts;
