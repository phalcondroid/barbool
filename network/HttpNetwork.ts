
export class NetworkResult {

}

export class HttpNetwork {
  constructor() {}

  get<Type>(url: string, subscription: Function) {
    fetch(url).then((data) => {
      
    });
  }

  async request<TResponse>(
    url: string, 
    config: RequestInit
  ): Promise<TResponse> {
    const response = await fetch(url, config);
    return await response.json();
  }
  
}