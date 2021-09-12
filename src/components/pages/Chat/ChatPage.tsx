import React, {useEffect, useState} from "react";
import {ChatMessageType} from "../../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../redux/chat-reducer";
import {AppStateType} from "../../../redux/redux-store";

let webSocketChanel: WebSocket;

const ChatPage = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

const Chat = () => {

  const [myMessage, setMyMessage] = useState('')

  const messages = useSelector((state: AppStateType) => state.chat.messages)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])

  const onSendMessage = (message: string) => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message));
    setMyMessage('')
  }

  return (
    <div>
      <div>
        {messages.map((message: ChatMessageType, index) => {
          return <Message message={message} key={index}/>
        })}
      </div>
      <textarea onChange={(e) => setMyMessage(e.currentTarget.value)} value={myMessage}></textarea>
      <div>
        <button onClick={() => onSendMessage(myMessage)}>Send</button>
      </div>
    </div>
  )
}

type MessagePropsType = {
  message: ChatMessageType
}

const Message: React.FC<MessagePropsType> = (props) => {
  return (
    <div>
      <div><img src={props.message.photo} alt="user"/></div>
      <div>{props.message.userName}</div>
      <div>{props.message.message}</div>
    </div>
  )
}

export default ChatPage;