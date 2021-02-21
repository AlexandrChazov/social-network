import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../store/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

// const MyPostsContainer = (props) => {
//
//   const state = props.store.getState();
//
//   const onPostChange = (text) => {
//     const action = updateNewPostTextActionCreator(text);
//     props.store.dispatch(action);
//   }
//
//   const onAddPost = () => {
//     const action = addPostActionCreator();
//     props.store.dispatch(action);
//   }
//
//   return (
//       <MyPosts updateNewPostText = { onPostChange }
//                addPost = { onAddPost }
//                chat = { state.profilePage.chats }
//                textareaValue = { state.profilePage.textareaValue } />
//   )
// }

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      const action = updateNewPostTextActionCreator(text);
      dispatch(action);
    },
    addPost: () => {
      const action = addPostActionCreator();
      dispatch(action);
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
