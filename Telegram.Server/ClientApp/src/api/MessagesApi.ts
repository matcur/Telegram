import {ApiClient} from "./ApiClient";
import {Message} from "../models";

export class MessagesApi {
  private readonly api: ApiClient

  constructor(authorizeToken: string) {
    this.api = new ApiClient('1.0', {
      Authorization: `Bearer ${authorizeToken}`
    })
  }

  add(message: Message) {
    return this.api.post<Message>(
      'messages/create',
      message
    )
  }

  update(message: Partial<Message>) {
    return this.api.put<Message>(
        'messages',
        message
    )
  }
}