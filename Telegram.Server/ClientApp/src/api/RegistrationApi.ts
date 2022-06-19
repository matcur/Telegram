import {ApiClient} from "api/ApiClient";
import {User} from "models";

export class RegistrationApi {
  api = new ApiClient()

  async register(phone: {number: string}) {
    return await this.api.post<User>(
      `user/register?firstName=&lastName=&phoneNumber=${phone.number}`
    )
  }
}