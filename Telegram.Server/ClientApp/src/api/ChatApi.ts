import {ApiClient, host} from "./ApiClient";
import {Message} from "models";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

export class ChatApi {
  private readonly id: number
  
  private readonly api: ApiClient
  
  constructor(id: number, authorizeToken: string) {
    this.id = id
    this.api = new ApiClient('1.0', {
      Authorization: `Bearer ${authorizeToken}`
    })
  }
  
  async messages(offset: number, count: number) {
    return await this.api.get<Message[]>(
      `chats/${this.id}/messages?offset=${offset}&count=${count}`
    )
  }
}