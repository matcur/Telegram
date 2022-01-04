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

  async add(data: FormData) {
    return await this.api.post<Message>(
      `messages/create`,
      data
    )
  }

  async update(id: number, message: FormData) {
    return await this.api.put<Message>(
        `messages/${id}`,
        message
    )
  }
}