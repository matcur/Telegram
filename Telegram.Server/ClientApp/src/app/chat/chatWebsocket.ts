import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message, User} from "../../models";
import {callWith} from "../../utils/array/callWith";
import {throttle} from "../../utils/throttle";
import {typingThrottleTime} from "../../typingSettings";


type MessageCallback = (message: Message) => void;
type UserCallback = (user: User) => void;

type Websocket = {
  webhook?: HubConnection
  chatId: number
  callbacks: {
    messageAdded: Set<MessageCallback>,
    messageUpdated: Set<MessageCallback>,
    messageTyping: Set<UserCallback>,
    memberUpdated: Set<UserCallback>,
  }
}

const websockets: Websocket[] = []
const nullWebsocket: Websocket = {
  chatId: -1,
  webhook: undefined,
  callbacks: {
    messageAdded: new Set(),
    messageUpdated: new Set(),
    messageTyping: new Set(),
    memberUpdated: new Set(),
  }
}

const initChatWebsocket = async (chatId: number, authorizeToken: string) => {
  if (chatWebsocketExists(chatId)) {
    return
  }
  
  const webhook = new HubConnectionBuilder()
    .withUrl(`/hubs/chats?chatId=${chatId}`, {
      accessTokenFactory: () => authorizeToken,
    })
    .withAutomaticReconnect()
    .build()

  const callbacks: Websocket["callbacks"] = {
    messageAdded: new Set(),
    messageUpdated: new Set(),
    messageTyping: new Set(),
    memberUpdated: new Set(),
  };
  websockets.push({
    chatId,
    webhook,
    callbacks,
  })
  await webhook.start()
  webhook.on("MessageAdded", (json: string) => {
    callWith(callbacks.messageAdded.values(), JSON.parse(json) as Message)
  })
  webhook.on("MessageUpdated", json => {
    callWith(callbacks.messageUpdated.values(), JSON.parse(json) as Message)
  })
  webhook.on("MessageTyping", json => {
    callWith(callbacks.messageTyping.values(), JSON.parse(json) as User)
  })
  webhook.on("MemberUpdated", json => {
    callWith(callbacks.memberUpdated.values(), JSON.parse(json) as User)
  })
}

const findWebsocket = (chatId: number) => {
  return websockets.find(w => w.chatId === chatId) ?? nullWebsocket;
}

const chatWebsocketExists = (chatId: number) => {
  return findWebsocket(chatId) !== nullWebsocket
}

// TODO: extract code to separate function 
const onMessageAdded = (chatId: number, callback: MessageCallback) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.messageAdded
  callbacks.add(callback)

  return () => callbacks.delete(callback)
}

const onMessageUpdated = (chatId: number, callback: MessageCallback) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.messageUpdated
  callbacks.add(callback)

  return () => callbacks.delete(callback)
}

const onMessageTyping = (chatId: number, callback: UserCallback) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.messageTyping
  callbacks.add(callback)

  return () => callbacks.delete(callback)
}

const emitMessageTyping = throttle((chatId: number) => {
  findWebsocket(chatId)?.webhook?.invoke("EmitMessageTyping")
}, typingThrottleTime)

const onMemberUpdated = (chatId: number, callback: (user: User) => void) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.memberUpdated
  callbacks.add(callback)

  return () => callbacks.delete(callback)
}

export {
  onMessageAdded,
  onMessageUpdated,
  onMessageTyping,
  onMemberUpdated,
  emitMessageTyping,
  initChatWebsocket,
  chatWebsocketExists,
}