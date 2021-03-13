import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../store/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

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
