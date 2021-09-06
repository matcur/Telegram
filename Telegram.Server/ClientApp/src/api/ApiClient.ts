export class ApiClient {
  private readonly baseUri = 'https://localhost:5001/api/'

  constructor(version: string = '1.0') {
    this.baseUri += (version + '/')
  }

  async get<TResult>(resource: string, requestInit: RequestInit = {}) {
    return await fetch(this.baseUri + resource, requestInit)
      .then(res => res.json() as Promise<TResult>)
  }

  async post<TResult>(resource: string, body: FormData | any = {}) {
    if (body instanceof FormData) {
      return await this.sendXmlHttpRequest<{success: boolean, result: TResult}>(
        resource, body, 'POST'
      )
    }

    return await fetch(this.baseUri + resource, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => res.json() as Promise<{success: boolean, result: TResult}>)
  }

  async sendXmlHttpRequest<TResult>(resource: string, data: FormData, method: string) {
    return new Promise<TResult>((res, rej) => {
      const request = new XMLHttpRequest();

      request.open(method, this.baseUri + resource);
      request.send(data);

      request.onload = () => res(JSON.parse(request.response))
      request.onerror = () => rej('error occurred')
    })
  }
}