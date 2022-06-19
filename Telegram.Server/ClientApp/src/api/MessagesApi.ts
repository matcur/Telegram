import {ApiClient} from "./ApiClient";
import {Message} from "../models";
import {toFormData} from "../utils/toFormData";

export class MessagesApi {
  private readonly api: ApiClient

  constructor(authorizeToken: string) {
    this.api = new ApiClient('1.0', {
      Authorization: `Bearer ${authorizeToken}`
    })
  }

  add(data: FormData) {
    return this.api.post<Message>(
      'messages/create',
      data
    )
  }

  update(message: FormData) {
    return this.api.put<Message>(
        'messages',
        message
    )
  }
}