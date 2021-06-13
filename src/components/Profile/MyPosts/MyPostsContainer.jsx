// import React from 'react';
import {profileActions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (myMessage) => {
      const action = profileActions.addPostActionCreator(myMessage);
      dispatch(action);
    },
    deletePost: (id) => {
      const action = profileActions.deletePost((id));
      dispatch(action);
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
