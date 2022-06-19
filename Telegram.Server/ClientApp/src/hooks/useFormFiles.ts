import {useState} from "react";
import {FilesApi} from "../api/FilesApi";

export const useFormFiles = () => {
  const [urls, setUrls] = useState<string[]>([])

  const upload = async (input: HTMLInputElement) => {
    const files = input.files
    if (files === null) {
      return []
    }

    if (files.length === 0) {
      return []
    }

    return await new FilesApi()
      .upload(input.name, files)
      .then(paths => {
        setUrls(paths)

        return paths
      })
  }

  return {
    urls,
    upload,
  }
}