import {User} from "../../models";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {unsubscribe} from "../../utils/array/unsubscribe";

type UserUpdatedCallback = (user: User) => void
type AddedInNewChatCallback = (chatId: number) => void

const userUpdatedCallbacks: UserUpdatedCallback[] = []
const addedInNewChatCallbacks: AddedInNewChatCallback[] = []

const subscribeUserUpdated = (callback: UserUpdatedCallback) => {
  if (userUpdatedCallbacks.indexOf(callback) !== -1) {
    return unsubscribe(userUpdatedCallbacks, callback)
  }
  
  userUpdatedCallbacks.push(callback)
  
  return unsubscribe(userUpdatedCallbacks, callback)
}

const subscribeAddedInChat = (callback: AddedInNewChatCallback) => {
  if (addedInNewChatCallbacks.indexOf(callback) !== -1) {
    return unsubscribe(addedInNewChatCallbacks, callback)
  }

  addedInNewChatCallbacks.push(callback)
  
  return unsubscribe(addedInNewChatCallbacks, callback)
}

const initUserWebhook = async (id: number, token: string) => {
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
  webhook.on("AddedInChat", (userJson: string) => {
    let chatId: number
    try {
      chatId = JSON.parse(userJson)
    } catch (e) {
      console.error(e, "Can't parse chat id")
      return
    }
    addedInNewChatCallbacks.forEach(c => c(chatId))
  })
}

export {
  initUserWebhook,
  subscribeUserUpdated,
  subscribeAddedInChat,
}