export class ApiClient {
  private readonly host = host
  
  private readonly headers: Record<string, string>;

  constructor(version: string = '1.0', headers: Record<string, string> = {}) {
    this.headers = headers;
    this.host += (version + '/')
  }

  async get<TResult>(resource: string, requestInit: RequestInit = {}) {
    return await fetch(this.host + resource, requestInit)
      .then(res => res.json() as Promise<TResult>)
  }

  async post<TResult>(resource: string, body: FormData | any = {}) {
    if (body instanceof FormData) {
      return await this.sendXmlHttpRequest<{success: boolean, result: TResult}>(
        resource, body, 'POST'
      )
    }

    return await fetch(this.host + resource, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...this.headers,
      },
      body: JSON.stringify(body),
    }).then(res => res.json() as Promise<{success: boolean, result: TResult}>)
  }

  async sendXmlHttpRequest<TResult>(resource: string, data: FormData, method: string) {
    return new Promise<TResult>((res, rej) => {
      const request = new XMLHttpRequest();

      request.open(method, this.host + resource);
      
      const keys = Object.keys(this.headers)
      keys.forEach(key => {
        request.setRequestHeader(key, this.headers[key])
      })
      
      request.send(data);

      request.onload = () => res(JSON.parse(request.response))
      request.onerror = () => rej('error occurred')
    })
  }
}

export const host = 'https://localhost:5001/api/'