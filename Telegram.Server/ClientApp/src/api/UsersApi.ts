import {ApiClient} from "api/ApiClient";
import {User} from "models";

export class UsersApi {
  api = new ApiClient()

  find(number: string) {
    return this.api.get<User>(`user/phone/${number}`)
  }
}