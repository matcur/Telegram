import {ApiClient} from "api/ApiClient";
import {Chat} from "models";
import {Omit} from "react-redux";

export class ChatsApi {
  api = new ApiClient()

  async add(chat: Omit<Chat, 'id' | 'messages'>) {
    let id = Math.round(Math.random() * 1000);

    return new Promise(res => res(1))
      .then(res => ({
        ...chat,
        id,
        messages: [],
      }))
  }
}