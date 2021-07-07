// import React from 'react';
import {profileActions} from "../../../redux/profile-reducer";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import { connect } from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts
  }
}
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (myMessage) => {
//       const action = profileActions.addPostActionCreator(myMessage);
//       dispatch(action);
//     },
//     deletePost: (id) => {
//       const action = profileActions.deletePost((id));
//       dispatch(action);
//     }
//   }
// }

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: profileActions.addPostActionCreator,
  deletePost: profileActions.deletePost
})(MyPosts)

export default MyPostsContainer;
