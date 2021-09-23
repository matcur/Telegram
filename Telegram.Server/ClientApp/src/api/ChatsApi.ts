import {ApiClient} from "api/ApiClient";
import {Chat} from "models";
import {Omit} from "react-redux";

export class ChatsApi {
  api = new ApiClient()

  async add(chat: Omit<Chat, 'id' | 'messages'>) {
    return this.api.post<Chat>('chats/create', chat)
  }
}