import {ApiClient} from "./ApiClient";
import {Message} from "../models";

export class MessagesApi {
  private readonly api: ApiClient

  constructor(authorizeToken: string) {
    this.api = new ApiClient('1.0', {
      Authorization: `Bearer ${authorizeToken}`
    })
  }

  async add(data: FormData) {
    return await this.api.post<Message>(
      `messages/create`,
      data
    )
  }
}