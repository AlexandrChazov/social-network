import React, {useEffect, useState} from "react";

const webSocketChanel: WebSocket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

const ChatPage = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

const Chat = () => {

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [myMessage, setMyMessage] = useState('')

  useEffect(() => {
    webSocketChanel.addEventListener("message", (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, ...JSON.parse(event.data)])
    })
  }, []);

  const onSendMessage = (mess: string) => {
    if (!mess) {
      return
    }
    webSocketChanel.send(mess);
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

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
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