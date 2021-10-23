import {ApiClient} from "api/ApiClient";
import {Chat} from "models";

export class AuthorizedUserApi {
  readonly api: ApiClient

  constructor(token: string) {
    this.api = new ApiClient('1.0', {
      Authorization: `Bearer ${token}`
    })
  }

  async chats(): Promise<{success: boolean, result: Chat[]}> {
    return await this.api.get('authorized-user/chats')
  }
  
  async changeAvatar(uri: string) {
    return await this.api.post(`authorized-user/avatar?uri=${uri}`)
  }
}