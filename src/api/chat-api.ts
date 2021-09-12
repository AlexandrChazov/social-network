
let observers = [] as ObserverType[]  // массив подписчиков

let webSocketChanel: WebSocket | null = null;

const closeHandler = () => {
  setTimeout(createChannel, 3000);
}

const messageHandler = (event: MessageEvent) => {
  const newMessage = JSON.parse(event.data);
  observers.forEach(s => s(newMessage))
}

const createChannel = () => {
  webSocketChanel?.removeEventListener('close', closeHandler);
  webSocketChanel?.close();
  webSocketChanel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
  webSocketChanel.addEventListener('close', closeHandler);
  webSocketChanel.addEventListener('message', messageHandler);
}

export const chatAPI = {
  start() {
    createChannel()
  },
  stop() {
    observers = [];
    webSocketChanel?.removeEventListener('close', closeHandler);
    webSocketChanel?.removeEventListener('message', messageHandler);
    webSocketChanel?.close()
  },
  subscribe(observer: (messages: ChatMessageType[]) => void) {
    observers.push(observer);  // пушим функции, которые в будущем сработают с нужным аргументом, это и есть подписчики
    return () => {
      observers = observers.filter(s => s !== observer) // при вызове метода subscribe произойдёт отписка
    }
  },
  unsubscribe(observer: ObserverType) {                         // это второй вариант отписки
    observers = observers.filter(s => s !== observer)
  },
  sendMessage(message: string) {
    webSocketChanel?.send(message)
  }
}

export type ObserverType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}