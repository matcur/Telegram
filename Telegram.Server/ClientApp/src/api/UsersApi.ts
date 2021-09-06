import {ApiClient} from "api/ApiClient";
import {User} from "models";

export class UsersApi {
  api = new ApiClient()

  async find(number: string): Promise<{success: boolean, result: User}> {
    return await this.api.get(`user/phone/${number}`)
  }
}