import {User} from "../../models";
import {HubConnectionBuilder} from "@microsoft/signalr";

type UserUpdatedCallback = (user: User) => void
type AddedInNewChatCallback = (chatId: number) => void

const userUpdatedCallbacks: Set<UserUpdatedCallback> = new Set()
const addedInNewChatCallbacks: Set<AddedInNewChatCallback> = new Set()

const onUserUpdated = (callback: UserUpdatedCallback) => {
  userUpdatedCallbacks.add(callback)
  return () => userUpdatedCallbacks.delete(callback)
}

const onAddedInChat = (callback: AddedInNewChatCallback) => {
  addedInNewChatCallbacks.add(callback)
  return () => addedInNewChatCallbacks.delete(callback)
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
  onUserUpdated,
  onAddedInChat,
}