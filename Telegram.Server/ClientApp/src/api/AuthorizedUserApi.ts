import {ApiClient} from "api/ApiClient";
import {Chat} from "models";

export class AuthorizedUserApi {
  api = new ApiClient()

  constructor(private token: string) {
  }

  async chats(): Promise<{success: boolean, result: Chat[]}> {
    return await this.api.get('authorized-user/chats', {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}