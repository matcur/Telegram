import {ApiClient} from "api/ApiClient";
import {Phone} from "models";

export class PhonesApi {
  api = new ApiClient()

  async exists(number: string) {
    return await this.api.get<boolean>(`phones/${number}/exists`)
  }

  async find(number: string): Promise<{success: boolean, result: Phone}> {
    return await this.api.get(`phones/${number}`)
  }
}