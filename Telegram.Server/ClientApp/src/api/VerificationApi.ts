import {ApiClient} from "api/ApiClient";
import {Code, Phone} from "models";

export class VerificationApi {
  api = new ApiClient()

  async byPhone(number: string): Promise<{success: boolean, result: unknown}> {
    return this.api.post(`verification/by-phone?number=${number}`)
  }

  async fromTelegram(phone: Pick<Phone, 'number'>): Promise<{success: boolean, result: unknown}> {
    return await this.api.post(`verification/from-telegram?number=${phone.number}`)
  }

  async token(code: Code): Promise<{success: boolean, result: string}> {
    return await this.api.get(`verification/authorization-token?value=${code.value}&userId=${code.userId}`)
  }
}