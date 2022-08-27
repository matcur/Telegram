import {User} from "../../models";
import {HubConnectionBuilder} from "@microsoft/signalr";

type Callback = (user: User) => void

const callbacks: Callback[] = []

const unsubscribe = (callback: Callback) => {
  return () => callbacks.splice(callbacks.indexOf(callback), 1)
}

const subscribe = (callback: Callback) => {
  if (callbacks.indexOf(callback) !== -1) {
    return unsubscribe(callback)
  }
  
  callbacks.push(callback)
  
  return unsubscribe(callback)
}

const init = async (id: number, token: string) => {
  const webhook = new HubConnectionBuilder()
    .withUrl(`/hubs/user?userId=${id}`, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build()
  await webhook.start()
  webhook.on("UserOrFriendUpdated", (userJson: string) => {
    let user: User;
    try {
      user = JSON.parse(userJson)
    } catch (e) {
      console.error(e, "Can't parse updated user")
      return
    }
    callbacks.forEach(c => c(user))
  })
}

export {
  init,
  subscribe,
  unsubscribe,
}