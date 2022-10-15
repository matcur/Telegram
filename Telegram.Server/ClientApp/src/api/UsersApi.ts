import {ApiClient} from "api/ApiClient";
import {User} from "models";

export class UsersApi {
  api = new ApiClient()

  findByPhone(number: string) {
    return this.api.get<User>(`user/phone/${number}`)
  }
  
  findById(id: number) {
    return this.api.get<User>(`users/${id}`)
  }
  
  all() {
    return this.api.get<User[]>("users")
  }
}