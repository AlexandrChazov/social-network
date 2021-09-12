import {chatAPI, ChatMessageType} from "../api/chat-api";
import {InferActionsTypes, PrimaryThunkType} from "./redux-store";
import {Dispatch} from "redux";

type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof chatActions>;
type ThunkType = PrimaryThunkType<ActionsType>;

const initialState = {
  messages: [] as ChatMessageType[]
}

export const chatActions = {
  messagesRecieved: (messages: ChatMessageType[]) => ({
    type: "chat/MESSAGES_RECIEVED", messages
  } as const)
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "chat/MESSAGES_RECIEVED": {
      return {
        ...state,
        messages: [...state.messages, ...action.messages]
      }
    }
    default:
      return state
  }
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatActions.messagesRecieved(messages))
    }
  }
  return _newMessageHandler;
}

export const startMessagesListening = (): ThunkType => {
  return async (dispatch: Dispatch) => {
    chatAPI.start();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
  }
}

export const stopMessagesListening = (): ThunkType => {
  return async (dispatch: Dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
  }
}

export const sendMessage = (message: string): ThunkType => {
  return async () => {
    chatAPI.sendMessage(message);
  }
}

export default chatReducer;