import {User} from "../../models";
import {HubConnectionBuilder} from "@microsoft/signalr";

type UserUpdatedCallback = (user: User) => void

const userUpdatedCallbacks: UserUpdatedCallback[] = []

const unsubscribe = (callbacks: UserUpdatedCallback[], callback: UserUpdatedCallback) => {
  return () => callbacks.splice(callbacks.indexOf(callback), 1)
}

const subscribeUserUpdated = (callback: UserUpdatedCallback) => {
  if (userUpdatedCallbacks.indexOf(callback) !== -1) {
    return unsubscribe(userUpdatedCallbacks, callback)
  }
  
  userUpdatedCallbacks.push(callback)
  
  return unsubscribe(userUpdatedCallbacks, callback)
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
    userUpdatedCallbacks.forEach(c => c(user))
  })
}

export {
  init,
  subscribeUserUpdated,
  unsubscribe,
}