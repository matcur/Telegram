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
  
  messages(offset: number, count: number, text: string = "") {
    return this.api.post<Message[]>(
      `chats/${this.id}/messages`, {
        pagination: {
          offset,
          count,
          text,
        }
      }
    )
  }
  
  addMember(userId: number) {
    return this.api.post(`chats/${this.id}/new-member/${userId}`)
  }
}