import {ApiClient} from "./ApiClient";

export class FilesApi {
  api = new ApiClient()

  async upload(name: string, files: FileList) {
    const form = new FormData()

    for (let i = 0; i < files.length; i++) {
      form.append(name, files[i])
    }

    return this.api.post<string[]>('files', form)
  }
}