import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {callWith} from "../../utils/array/callWith";
import {addIfNotExists} from "../../utils/array/addInNotExists";
import {unsubscribe} from "../../utils/array/unsubscribe";

type Websocket = {
  webhook: HubConnection
  userId: number
  callbacks: {
    online: ((userId: number) => void)[],
    offline: ((userId: number) => void)[],
  }
}

type Callback = (userId: number) => void

const websockets: Websocket[] = []

const findWebsocket = (userId: number) => {
  return websockets.find(w => w.userId === userId);
}

const initActiveWebsocket = async (userId: number, authorizeToken: string) => {
  if (findWebsocket(userId)) {
    return
  }

  const webhook = new HubConnectionBuilder()
    .withUrl(`/hubs/activity?userid=${userId}`, {
      accessTokenFactory: () => authorizeToken,
    })
    .withAutomaticReconnect()
    .build()

  const callbacks = {
    online: [],
    offline: [],
  };
  const websocket = {
    userId,
    webhook,
    callbacks,
  }
  websockets.push(websocket)
  await webhook.start()
  webhook.on("EmitOnline", (json: string) => {
    callWith(callbacks.online, JSON.parse(json) as number)
  })
  webhook.on("EmitOffline", (json: string) => {
    callWith(callbacks.offline, JSON.parse(json) as number)
  })
  
  return () => {
    webhook.stop()
    websockets.splice(
      websockets.findIndex(w => w.userId === userId),
      1
    )
  }
}

function add(userId: number, callbacksKey: keyof Websocket["callbacks"], callback: (userId: number) => void) {
  const websocket = findWebsocket(userId)
  if (!websocket) {
    return () => {
    }
  }
  const callbacks = websocket.callbacks[callbacksKey]
  addIfNotExists(callbacks, callback)
  return unsubscribe(callbacks, callback)
}

const onOnline = (userId: number, callback: Callback) => {
  return add(userId, "online", callback)
}

const onOffline = (userId: number, callback: Callback) => {
  return add(userId, "offline", callback)
}

const emit = (userId: number, method: string) => {
  const websocket = findWebsocket(userId)
  if (!websocket) {
    return
  }

  websocket.webhook.invoke(method)
}

const emitOnline = (userId: number) => {
  emit(userId, "EmitOnline")
}

const emitOffline = (userId: number) => {
  emit(userId, "EmitOffline")
}

const forceCallOffline = (userId: number) => {
  const websocket = findWebsocket(userId)
  if (!websocket) {
    return
  }
  callWith(websocket.callbacks.offline, userId)
}

export {
  initActiveWebsocket,
  onOnline,
  onOffline,
  emitOnline,
  emitOffline,
  forceCallOffline,
}