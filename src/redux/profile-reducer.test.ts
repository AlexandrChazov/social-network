import {profileActions, profileReducer} from "./profile-reducer";
import {ChatsArrayType, ProfileType} from "../Types/types";

const initialState = {
  textareaValue: 'IT-kamasutra.com' as string,
  posts: [
    {id: 1, mess: "Hello, how are you?", likesCount: 10},
    {id: 2, mess: "What are you wont?", likesCount: 10},
    {id: 3, mess: "What are hell are you doing?", likesCount: 20},
    {id: 4, mess: "dada", likesCount: 15}
  ] as Array<ChatsArrayType>,
  profile: null as ProfileType | null,
  status: ""
}

test(`count of messages should increment`, () => {
  const action = profileActions.addPostActionCreator("New message")
  const newState = profileReducer(initialState, action);
  expect(newState.posts.length).toBe(5)
})

test(`count of messages should be decrement`, () => {
  const action = profileActions.deletePost(4);
  const newState = profileReducer(initialState, action);
  expect(newState.posts.length).toBe(3)
})

test(`new message should be correct`, () => {
  const action = profileActions.addPostActionCreator("New message");
  const newState = profileReducer(initialState, action);
  expect(newState.posts[4].mess).toBe("New message")
})
