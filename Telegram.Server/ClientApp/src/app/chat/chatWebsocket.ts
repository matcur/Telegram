import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Message, User} from "../../models";
import {unsubscribe} from "../../utils/array/unsubscribe";
import {addIfNotExists} from "../../utils/array/addInNotExists";
import {callWith} from "../../utils/array/callWith";
import {throttle} from "../../utils/throttle";
import {typingThrottleTime} from "../../typingSettings";

type Websocket = {
  webhook?: HubConnection
  chatId: number
  callbacks: {
    messageAdded: ((message: Message) => void)[],
    messageUpdated: ((message: Message) => void)[],
    messageTyping: ((message: Message) => void)[],
    memberUpdated: ((message: Message) => void)[],
  }
}

const websockets: Websocket[] = []
const nullWebsocket: Websocket = {
  chatId: -1,
  webhook: undefined,
  callbacks: {
    messageAdded: [],
    messageUpdated: [],
    messageTyping: [],
    memberUpdated: [],
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

  const callbacks = {
    messageAdded: [],
    messageUpdated: [],
    messageTyping: [],
    memberUpdated: [],
  };
  websockets.push({
    chatId,
    webhook,
    callbacks,
  })
  await webhook.start()
  webhook.on("MessageAdded", (json: string) => {
    callWith(callbacks.messageAdded, JSON.parse(json) as Message)
  })
  webhook.on("MessageUpdated", json => {
    callWith(callbacks.messageUpdated, JSON.parse(json) as Message)
  })
  webhook.on("MessageTyping", json => {
    callWith(callbacks.messageTyping, JSON.parse(json) as User)
  })
  webhook.on("MemberUpdated", json => {
    callWith(callbacks.memberUpdated, JSON.parse(json) as User)
  })
}

const findWebsocket = (chatId: number) => {
  return websockets.find(w => w.chatId === chatId) ?? nullWebsocket;
}

const chatWebsocketExists = (chatId: number) => {
  return findWebsocket(chatId) !== nullWebsocket
}

const onMessageAdded = (chatId: number, callback: (message: Message) => void) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.messageAdded
  addIfNotExists(callbacks, callback)
  
  return unsubscribe(callbacks, callback)
}

const onMessageUpdated = (chatId: number, callback: (message: Message) => void) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.messageUpdated
  addIfNotExists(callbacks, callback)

  return unsubscribe(callbacks, callback)
}

const onMessageTyping = (chatId: number, callback: (user: User) => void) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.messageTyping
  addIfNotExists(callbacks, callback)

  return unsubscribe(callbacks, callback)
}

const emitMessageTyping = throttle((chatId: number) => {
  findWebsocket(chatId)?.webhook?.invoke("EmitMessageTyping")
}, typingThrottleTime)

const onMemberUpdated = (chatId: number, callback: (message: User) => void) => {
  const websocket = findWebsocket(chatId)
  const callbacks = websocket.callbacks.memberUpdated
  addIfNotExists(callbacks, callback)

  return unsubscribe(callbacks, callback)
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