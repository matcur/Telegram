import {ApiClient} from "api/ApiClient";
import {Phone} from "models";

export class PhonesApi {
  api = new ApiClient()

  exists(number: string) {
    return this.api.get<boolean>(`phones/${number}/exists`)
  }

  find(number: string) {
    return this.api.get<Phone>(`phones/${number}`)
  }
}