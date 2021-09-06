import {ApiClient} from "api/ApiClient";
import {Code} from "models";

export class CodesApi {
  api = new ApiClient()

  async valid(code: {value: string, userId: number}) {
    return this.api.get<{result: boolean, success: boolean}>(
      `verification/check-code?value=${code.value}&userId=${code.userId}`
    )
  }
}