import {ApiClient} from "./ApiClient";

export class FilesApi {
  api = new ApiClient()

  async upload(name: string, files: FileList): Promise<{success: boolean, result: string[]}> {
    const form = new FormData()

    for (let i = 0; i < files.length; i++) {
      form.append(name, files[i])
    }

    return this.api.post('files', form)
  }
}