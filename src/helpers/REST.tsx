export enum RESTMethod {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

class REST {
  
  static baseUrl = process.env.REACT_APP_API_URL;
  
  static request(
      endpoint: string,
      method: RESTMethod = RESTMethod.GET,
      params: object = {},
      headers: Headers = new Headers(),
  ): Promise<any> {
    
    let options: RequestInit = {
      method: method,
    };
    
    if (method === RESTMethod.GET) {
      if (Object.keys(params).length) {
        endpoint += "?" + Object.entries(params).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');
      }
    } else {
      if (!headers.has('Accept') && !headers.has('Content-Type')) {
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
      }
      options.body = JSON.stringify(params);
    }
    
    options.headers = headers;
    
    const url = /^https?:\/\//i.test(endpoint) ? endpoint : REST.baseUrl + endpoint;
    
    const startTime = Date.now();
    console.log('%c' + startTime + ' Api call', 'color: #0000ff; font-weight: bold;',
        '\n', method + ': ' + url, '\n', {
          params,
          headers
        });
    
    return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            const endTime = Date.now();
            console.log('%c' + endTime + ' Api error (' + (endTime - startTime) + 'ms)', 'color: #0000ff; font-weight: bold;',
                '\n', method + ': ' + url, '\n', {
                  status: response.status,
                  statusText: response.statusText
                });
            throw new Error(response.status.toString());
          }
          return response.json();
        })
        .then(response => {
          const endTime = Date.now();
          console.log('%c' + endTime + ' Api response (' + (endTime - startTime) + 'ms)', 'color: #0000ff; font-weight: bold;',
              '\n', method + ': ' + url, '\n', response);
          return response;
        });
  }
}

export default REST;