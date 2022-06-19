import {ApiClient} from "api/ApiClient";
import {Code, Phone} from "models";

export class VerificationApi {
  api = new ApiClient()

  byPhone(number: string) {
    return this.api.post(`verification/by-phone?number=${number}`)
  }

  fromTelegram(phone: Pick<Phone, 'number'>) {
    return this.api.post(`verification/from-telegram?number=${phone.number}`)
  }

  token(code: Code) {
    return this.api.get<string>(`verification/authorization-token?value=${code.value}&userId=${code.userId}`)
  }
}