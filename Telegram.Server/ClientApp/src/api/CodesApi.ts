import {ApiClient} from "api/ApiClient";

export class CodesApi {
  api = new ApiClient()

  valid(code: {value: string, userId: number}) {
    return this.api.get<boolean>(
      `verification/check-code?value=${code.value}&userId=${code.userId}`
    )
  }
}