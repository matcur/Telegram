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
  
  messages(offset: number, count: number) {
    return this.api.get<Message[]>(
      `chats/${this.id}/messages?offset=${offset}&count=${count}`
    )
  }
  
  addMember(userId: number) {
    return this.api.post(`chats/${this.id}/new-member/${userId}`)
  }
}