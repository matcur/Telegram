import {ApiClient} from "./ApiClient";
import {Message} from "models";

export class ChatApi {
  private readonly id: number
  
  private readonly api = new ApiClient()

  constructor(id: number) {
    this.id = id
  }
  
  async messages(offset: number, count: number) {
    return await this.api.get<Message[]>(
      `chats/${this.id}/messages?offset=${offset}&count=${count}"`
    )
  }

  async addMessage(data: FormData) {
    // return await this.api.post(
    //   `chats/${this.id}/messages/create`,
    //   data
    // )
    return await new Promise((res, rej) => {
      res(123)
    })
  }
}