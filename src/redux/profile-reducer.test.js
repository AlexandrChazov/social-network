import {addPostActionCreator, deletePost, profileReducer} from "./profile-reducer";

const initialState = {
  textareaValue: 'IT-kamasutra.com',
  chats : [
    {id: 1, mess: "Hello, how are you?", likesCount: 10},
    {id: 2, mess: "What are you wont?", likesCount: 10},
    {id: 3, mess: "What are hell are you doing?", likesCount: 20},
    {id: 4, mess: "dada", likesCount: 15}
  ],
  profile: null,
  status: ""
}

test(`count of messages should increment`, () => {
  const action = addPostActionCreator("New message")
  const newState = profileReducer(initialState, action);
  expect(newState.chats.length).toBe(5)
})

test(`count of messages should be decrement`, () => {
  const action = deletePost(4);
  const newState = profileReducer(initialState, action);
  expect(newState.chats.length).toBe(3)
})

test(`new message should be correct`, () => {
  const action = addPostActionCreator("New message");
  const newState = profileReducer(initialState, action);
  expect(newState.chats[4].mess).toBe("New message")
})