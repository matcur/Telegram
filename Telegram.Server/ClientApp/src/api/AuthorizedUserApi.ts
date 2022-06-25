import {ApiClient} from "api/ApiClient";
import {Chat, User} from "models";
import {Pagination} from "../utils/type";

export class AuthorizedUserApi {
  readonly api: ApiClient

  constructor(token: string, api: ApiClient = new ApiClient()) {
    this.api = api.withHeaders({
      Authorization: `Bearer ${token}`
    })
  }
  
  authorizedUser() {
    return this.api.get<User>('authorized-user')
  }
  
  chat(id: number) {
    return this.api.get<Chat>(`authorized-user/chats/${id}`)
  }

  chats(pagination: Pagination) {
    return this.api.post<Chat[]>('authorized-user/chats', {pagination})
  }
  
  chatIds() {
    return this.api.get<number[]>('authorized-user/chat-ids')
  }
  
  changeAvatar(uri: string) {
    return this.api.post(`authorized-user/avatar?uri=${uri}`)
  }
  
  contacts() {
    return this.api.get<User[]>('authorized-user/contacts')
  }
}