const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_MESSAGE_TEXT = "UPDATE-MESSAGE-TEXT";

export const onMessageChangeActionCreator = (text) => ({
  type: UPDATE_MESSAGE_TEXT,
  newMessage: text,
})

export const sendMessageActionCreator = () => ({ type: ADD_MESSAGE })

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE_TEXT:
      state.newMessage = action.newMessage;
      return state;
    case ADD_MESSAGE:
      state.messages.push({
        message: state.newMessage,
      })
      state.newMessage = "";
      return state;
    default:
      return state;
  }
}

export default dialogsReducer;