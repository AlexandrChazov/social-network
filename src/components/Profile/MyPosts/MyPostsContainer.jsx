import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../store/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props) => {

  const state = props.store.getState();

  const onPostChange = (text) => {
    const action = updateNewPostTextActionCreator(text);
    props.store.dispatch(action);
  }

  const onAddPost = () => {
    const action = addPostActionCreator();
    props.store.dispatch(action);
  }

  return (
      <MyPosts updateNewPostText = { onPostChange }
               addPost = { onAddPost }
               chat = { state.profilePage.chats }
               textareaValue = { state.profilePage.textareaValue } />
  )
}

export default MyPostsContainer;
