import {ApiClient} from "./ApiClient";
import {Message, User} from "models";
import {Pagination} from "../utils/type";

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
  
  addMembers(memberIds: number[]) {
    return this.api.post("chat/add-new-members", {
      memberIds,
      chatId: this.id,
    })
  }

  members(pagination: Pagination) {
    return this.api.post<User[]>(`chats/${this.id}/members`, {pagination})
  }
}