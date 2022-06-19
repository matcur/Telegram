import {ApiClient} from "api/ApiClient";
import {Chat} from "models";
import {Omit} from "react-redux";
import {toFormData} from "../utils/toFormData";

export class ChatsApi {
  api = new ApiClient()

  add(chat: Omit<Chat, 'id' | 'messages'>) {
    return this.api.post<Chat>('chats/create', toFormData(chat))
  }
}