import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {callWith} from "../../utils/array/callWith";

type Websocket = {
  webhook: HubConnection
  userId: number
  callbacks: {
    online: Set<Callback>,
    offline: Set<Callback>,
  }
}

type Callback = (lastActivity: Date) => void

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

  const callbacks: Websocket["callbacks"] = {
    online: new Set<Callback>(),
    offline: new Set<Callback>(),
  };
  const websocket = {
    userId,
    webhook,
    callbacks,
  }
  websockets.push(websocket)
  await webhook.start()
  webhook.on("EmitOnline", (userId: string) => {
    callWith(callbacks.online.values(), new Date())
  })
  webhook.on("EmitOffline", (userId: string, lastActivity: string) => {
    callWith(callbacks.offline.values(), new Date(lastActivity))
  })
  
  return () => {
    webhook.stop()
    websockets.splice(
      websockets.findIndex(w => w.userId === userId),
      1
    )
  }
}

function add(userId: number, callbacksKey: keyof Websocket["callbacks"], callback: Callback) {
  const websocket = findWebsocket(userId)
  if (!websocket) {
    return () => {
    }
  }
  const callbacks = websocket.callbacks[callbacksKey]
  callbacks.add(callback)
  return () => callbacks.delete(callback)
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

export {
  initActiveWebsocket,
  onOnline,
  onOffline,
  emitOnline,
  emitOffline,
}