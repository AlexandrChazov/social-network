const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newPost: text,
})

export const addPostActionCreator = () => ({ type: ADD_POST });

const initialState = {
  textareaValue: 'IT-kamasutra.com',
  chats : [
    {id: 1, mess: "Hello, how are you?", likesCount: 10},
    {id: 2, mess: "What are you wont?", likesCount: 10},
    {id: 3, mess: "What are hell are you doing?", likesCount: 20},
    {id: 4, mess: "dada", likesCount: 15}
  ]
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_POST_TEXT:
      state.textareaValue = action.newPost;
      return state;
    case ADD_POST:
      state.chats.push({
        id: 5,
        mess: state.textareaValue,
        likesCount: 0
      })
      state.textareaValue = "";
      return state;
    default:
      return state;
  }
}

export default profileReducer;