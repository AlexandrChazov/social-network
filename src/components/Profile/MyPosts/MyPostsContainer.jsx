// import React from 'react';
import {addPostActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    chats: state.profilePage.chats
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (myMessage) => {
      const action = addPostActionCreator(myMessage);
      dispatch(action);
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
