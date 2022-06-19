export class ApiClient {
  private readonly host = host
  
  private readonly headers: Record<string, string>
  
  private readonly version: string

  constructor(version: string = '1.0', headers: Record<string, string> = {}) {
    this.headers = headers;
    this.host += (version + '/')
    this.version = version
  }

  async get<TResult>(resource: string) {
    return await fetch(this.host + resource, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...this.headers,
      },
    }).then(res => res.json() as Promise<TResult>)
  }

  async post<TResult>(resource: string, body: FormData | any = {}) {
    return this.request<TResult>('POST', resource, body)
  }

  async put<TResult>(resource: string, body: FormData | any = {}) {
    return this.request<TResult>('PUT', resource, body)
  }
  
  async request<TResult>(method: string, resource: string, body: FormData | any = {}) {
    if (body instanceof FormData) {
      return await this.sendXmlHttpRequest<TResult>(
          resource, body, method
      )
    }

    return await fetch(this.host + resource, {
      method: method,
      headers: {
        'Accept': 'application/json',
        ...this.headers,
      },
      body: JSON.stringify(body),
    }).then(res => res.json() as Promise<TResult>)
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
  
  withHeaders(headers: Record<string, string>) {
    return new ApiClient(this.version, {...this.headers, ...headers})
  }
}

export const host = '/api/'