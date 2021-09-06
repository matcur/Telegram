import {ApiClient} from "api/ApiClient";
import {User} from "models";

export class RegistrationApi {
  api = new ApiClient()

  async register(phone: {number: string}): Promise<{success: boolean; result: User}> {
    return await this.api.post(`user/register?firstName=&lastName=&phoneNumber=${phone.number}`)
  }
}